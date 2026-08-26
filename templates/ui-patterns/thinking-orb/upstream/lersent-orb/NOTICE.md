# LerSent Liquid Orb — grabbed shaders (MIT)

Upstream: https://github.com/LerSent001/orb  
Live editor: https://lersent001.github.io/orb/

This folder is **shaders + LICENSE only**. It is not the React editor, not Vite, not Toolcraft UI.

| File | Use |
|---|---|
| `effect.wgsl` | WebGPU runtime (pair with upstream `createWebExport()` / `orb-renderer.ts` in the consuming app) |
| `effect.metal` | Generated SwiftUI/Metal twin of the same programs — **this** is the native grab, not MetalForge |
| `LICENSE` | Copyright (c) 2026 LerSent001 — keep with any copy |

Do not vendor `src/App.tsx` or `node_modules`. Tune presets in the live editor, record the URL hash, then export web HTML into the **product repo**.
