'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';

/** 预算登录 / 个人站：墨 + 米白。不要用出海云那盘蓝紫。 */
export const INK_MESH_COLORS = ['#FAFAFA', '#EDE8DF', '#171717', '#4D4D4D', '#321C1C'];

/** 出海云登录左栏：叠在 bg-primary 上。 */
export const CHUHAI_MESH_COLORS = ['#B8D4FF', '#4058EA', '#C4B5FD', '#1A237E', '#7DD3FC'];

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
