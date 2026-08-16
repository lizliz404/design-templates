'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';
import { INK_MESH_COLORS } from './login-mesh';

/**
 * Full-page mesh that listens on window (not on the canvas).
 * Used by lizliz.xyz HomePaperBg.
 */
export function PointerMesh({
  colors = INK_MESH_COLORS,
  dark = false,
}: {
  colors?: string[];
  dark?: boolean;
}) {
  const [reduced, setReduced] = useState(true);
  const [ptr, setPtr] = useState({ x: 0.5, y: 0.5 });
  const [boost, setBoost] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);

    const onMove = (e: PointerEvent) => {
      setPtr({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    const onClick = () => {
      setBoost(1);
      window.setTimeout(() => setBoost(0), 720);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    return () => {
      mq.removeEventListener('change', sync);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  if (reduced) return null;

  const swirl = 0.42 + (ptr.x - 0.5) * 0.46 + boost * 0.32;
  const distortion = 0.58 + (ptr.y - 0.5) * 0.3 + boost * 0.18;
  const speed = 0.28 + boost * 0.45;
  const palette = dark
    ? ['#1c1a16', '#2a2620', '#5c564c', '#b9a48a', '#fff8ee']
    : colors;

  return (
    <MeshGradient
      className="home-paper-shader"
      colors={palette}
      distortion={distortion}
      swirl={swirl}
      grainMixer={0.12}
      grainOverlay={0.06}
      speed={speed}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
