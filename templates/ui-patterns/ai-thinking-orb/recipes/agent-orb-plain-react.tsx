import { useEffect, useRef, useState } from 'react'

/**
 * Agent status orb: a single-accent fluid blob rendered with a WebGL1 shader.
 * Adapted from Rare UI's FluidOrb (https://www.rareui.com, source at
 * github.com/swamimalode07/rare-ui; no repo-level LICENSE — the site permits
 * use and modification, kit resale prohibited). Dependency-free hand port:
 * the accent color is read from the frozen --accent token, DPR is capped at 2,
 * prefers-reduced-motion renders one frozen frame at u_time = 0 with no rAF,
 * and any WebGL failure (missing context, shader error, context loss) swaps to
 * a static radial-gradient disc so the orb never leaves a transparent hole.
 * Decorative only: aria-hidden and pointer-events none.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.22;

  vec2 drift = vec2(
    sin(t) + 0.6 * sin(t * 1.7 + 1.3),
    cos(t * 0.8) + 0.6 * cos(t * 1.3 + 2.1)
  );

  vec2 p = vec2(uv.x * 1.8, uv.y * 1.0) + drift * 0.7;

  vec2 q = vec2(fbm(p + drift), fbm(p + vec2(3.2, 1.5) - drift));
  float f = fbm(p + 1.2 * q);

  float g = clamp(1.0 - uv.y, 0.0, 1.0);
  float anchor = smoothstep(0.0, 0.3, uv.y);
  float shade = clamp(g + (f - 0.5) * 0.8 * anchor, 0.0, 1.0);

  vec3 white = vec3(0.99, 1.0, 1.0);
  vec3 light = mix(white, u_color, 0.5);
  vec3 dark = u_color;

  vec3 col = white;
  col = mix(col, light, smoothstep(0.28, 0.52, shade));
  col = mix(col, dark, smoothstep(0.58, 0.88, shade));

  float edge = smoothstep(0.5, 0.49, distance(uv, vec2(0.5)));

  gl_FragColor = vec4(col * edge, edge);
}
`

const compileShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Resolve the frozen --accent token to shader RGB via a 1px canvas probe; falls back to a close blue. */
const readAccentRgb = (): [number, number, number] => {
  const fallback: [number, number, number] = [0.31, 0.47, 0.94]
  try {
    const token = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    if (!token) return fallback
    const probe = document.createElement('canvas')
    probe.width = 1
    probe.height = 1
    const ctx = probe.getContext('2d')
    if (!ctx) return fallback
    const sentinel = '#00ff01'
    ctx.fillStyle = sentinel
    ctx.fillStyle = token
    if (ctx.fillStyle === sentinel) return fallback
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    if (a === 0) return fallback
    return [r / 255, g / 255, b / 255]
  } catch {
    return fallback
  }
}

export function AgentOrb({ size = 36 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let raf = 0
    let disposed = false
    const cleanups: Array<() => void> = []

    const failToStatic = () => {
      cancelAnimationFrame(raf)
      if (!disposed) setFailed(true)
    }

    try {
      const gl = canvas.getContext('webgl', { antialias: true, alpha: true }) as WebGLRenderingContext | null
      if (!gl) throw new Error('webgl unavailable')
      const program = gl.createProgram()
      const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
      const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
      if (!program || !vert || !frag) throw new Error('shader unavailable')
      gl.attachShader(program, vert)
      gl.attachShader(program, frag)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link failed')
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      if (!buffer) throw new Error('buffer unavailable')
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
      const aPos = gl.getAttribLocation(program, 'a_pos')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      const uResolution = gl.getUniformLocation(program, 'u_resolution')
      const uTime = gl.getUniformLocation(program, 'u_time')
      const uColor = gl.getUniformLocation(program, 'u_color')
      if (!uResolution || !uTime || !uColor) throw new Error('uniforms unavailable')
      gl.uniform3f(uColor, ...readAccentRgb())

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const px = Math.round(size * dpr)
      canvas.width = px
      canvas.height = px
      gl.viewport(0, 0, px, px)
      gl.uniform2f(uResolution, px, px)

      const drawFrame = (seconds: number) => {
        gl.uniform1f(uTime, seconds)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }

      const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const onReduceChange = () => {
        if (!reduceQuery.matches) return
        cancelAnimationFrame(raf)
        drawFrame(0)
      }
      const onContextLost = (event: Event) => {
        event.preventDefault()
        failToStatic()
      }
      reduceQuery.addEventListener('change', onReduceChange)
      canvas.addEventListener('webglcontextlost', onContextLost)
      cleanups.push(() => reduceQuery.removeEventListener('change', onReduceChange))
      cleanups.push(() => canvas.removeEventListener('webglcontextlost', onContextLost))
      cleanups.push(() => {
        gl.deleteProgram(program)
        gl.deleteShader(vert)
        gl.deleteShader(frag)
        gl.deleteBuffer(buffer)
      })

      const start = performance.now()
      if (reduceQuery.matches) {
        drawFrame(0)
      } else {
        const loop = (now: number) => {
          drawFrame((now - start) / 1000)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      }
    } catch {
      failToStatic()
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      for (const cleanup of cleanups) cleanup()
    }
  }, [size])

  if (failed) {
    return <span className="agent-orb agent-orb--static" style={{ width: size, height: size }} aria-hidden="true" />
  }
  return <canvas ref={canvasRef} className="agent-orb" style={{ width: size, height: size }} aria-hidden="true" />
}
