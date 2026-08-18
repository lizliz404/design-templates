'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';
import { LIZLIZ_MESH_COLORS, LIZLIZ_MESH_COLORS_DARK } from './login-mesh';

/**
 * Full-page mesh for a personal-site homepage (lizliz.xyz HomePaperBg).
 *
 * Pointer/click only lerp-offset swirl + distortion.
 * Mesh owns speed (0.36). Do not drive speed from the pointer.
 * Canvas stays pointer-events: none — listen on window.
 *
 * Default palette is LIZLIZ paper→rust→ink, not INK_MESH_COLORS.
 * Two-layer stack: recipes/personal-site-stack.md
 */
export function PointerMesh({
  colors,
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
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
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
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [reduced]);

  const swirl = reduced ? 0.42 : 0.42 + (ptr.x - 0.5) * 0.46 + boost * 0.32;
  const distortion = reduced ? 0.58 : 0.58 + (ptr.y - 0.5) * 0.3 + boost * 0.18;
  const palette = colors ?? (dark ? LIZLIZ_MESH_COLORS_DARK : LIZLIZ_MESH_COLORS);

  return (
    <div className="home-paper-shader pointer-events-none absolute inset-0" aria-hidden="true">
      <MeshGradient
        colors={palette}
        distortion={distortion}
        swirl={swirl}
        grainMixer={0.12}
        grainOverlay={0.06}
        speed={reduced ? 0 : 0.36}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
