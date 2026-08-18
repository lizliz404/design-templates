'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';

/** 预算登录左栏：灰墨叠米白。OK on a split login pane. 不是个人站默认。 */
export const INK_MESH_COLORS = ['#FAFAFA', '#EDE8DF', '#171717', '#4D4D4D', '#321C1C'];

/** 出海云登录左栏：叠在 bg-primary 上。只给出海云。 */
export const CHUHAI_MESH_COLORS = ['#B8D4FF', '#4058EA', '#C4B5FD', '#1A237E', '#7DD3FC'];

/**
 * 个人站（lizliz.xyz）：暖纸 → rust → 深墨。5 色必须跨对比度。
 * paper #fffdf8 / #f1eee6 · rust #b14e22 · ink #716d64 / #141413
 * 页底填 #faf9f5，不要再拿进 mesh。不要用 INK_MESH_COLORS（同族墨灰叠暖纸会隐形）。
 */
export const LIZLIZ_MESH_COLORS = ['#fffdf8', '#f1eee6', '#b14e22', '#716d64', '#141413'];

/** 个人站暗色：深墨场 + 同一枚 rust。 */
export const LIZLIZ_MESH_COLORS_DARK = ['#141413', '#3a3630', '#716d64', '#b14e22', '#fffdf8'];

/**
 * Login left-pane atmosphere.
 * 对参：D:/dev/chuhai-cloud/web/src/pages/Login.tsx
 *       D:/dev/qiancheng-yusuan/next/src/app/login/login-mesh.tsx
 */
export function LoginMesh({
  colors = INK_MESH_COLORS,
}: {
  colors?: string[];
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
      <MeshGradient
        colors={colors}
        distortion={0.58}
        swirl={0.42}
        grainMixer={0.12}
        grainOverlay={0.06}
        speed={reduced ? 0 : 0.36}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
