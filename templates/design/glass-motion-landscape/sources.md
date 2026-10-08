# Glass motion landscape — source transcript

> Source record: the conversation below is preserved as supplied. The prior assistant's claims and source names were not verified when originally stated; this file is historical source material, not an endorsement. Findings and corrections belong in [`verification.md`](./verification.md).

另外一个，我很想研究和做到的效果：

无论是原子岛、聊天框，又或者是任何的一个胶囊状组件，是怎么做出那种非常丝滑的动画，和透明毛玻璃液态感的？我指的不仅是 iOS 生态里，比如当前 Android 版 X 也做出这种了，另外还有无数的地方都能感受到， Telegram 就是一个，只不过怎么没做那种太明显的液态玻璃感。

是有一个这样的 Skill，还是大势所趋的开源轮子，又或者是它底层解法非常简单？

而且似乎现在是行业最佳实践一般的，齐齐往那边聚。

---

是的，这已经是 2025–2026 年的行业最佳实践（Best Practice）了。  
不是某个神秘 Skill，也不是“底层超级复杂到无法复现”，而是苹果在 iOS 26 / macOS 把 Liquid Glass 做成系统级材料后，全行业（包括 Android 版 X、Telegram 部分界面、无数 Web/App）一起往这个方向聚拢。

### 核心效果拆解（你看到的“丝滑 + 透明毛玻璃液态感”）

其实可以分成三层，从简单到进阶：

1. 基础毛玻璃（Glassmorphism）  
   几乎所有地方都用：
   - backdrop-filter: blur(12–24px) saturate(150–180%)
   - 半透明底色 rgba(255,255,255,0.08~0.18) 或深色版本
   - 1px 左右的半透明描边 + 轻阴影
   - 超大 border-radius（胶囊/ pill 形态）

2. 真正的 Liquid Glass（液态玻璃 / 边缘折射）  
   这才是“液态感”的关键，远超普通毛玻璃：
   - 用 SVG 滤镜（feDisplacementMap + feTurbulence 或预生成的位移图）让边缘像透镜一样弯曲背景
   - 边缘出现轻微色差（chromatic aberration）
   - 高光描边 / specular rim（模拟玻璃厚度和反光）
   - 有时加一点噪点或 Fresnel 效果

   浏览器里 Chromium 支持最好（backdrop-filter: url(#filter)），Safari/Firefox 会优雅降级成普通 blur。

3. 丝滑动画 + 液态 morph（Dynamic Island / 胶囊变形的灵魂）  
   - 弹簧物理（spring animation）：Framer Motion / Motion 库、CSS spring，或者自己写阻尼弹簧
   - 表面与内容分离：玻璃形状层可以自由拉伸、合并、变形；文字/图标层只做 cross-fade 或轻微位移，绝不跟着缩放（保持清晰）
   - Metaball / SDF（符号距离场）做“液滴靠近就融合”的效果
   - 布局动画（layout animation / shared element）+ 高帧率 GPU 加速（只动 transform、opacity、filter、clip-path）

Dynamic Island 那种“呼吸、扩展、合并、弹回”的感觉，核心就是弹簧 + 形状层与内容层分离。

### 底层解法其实不复杂

- 最基础版：几行 CSS 就能做出不错的毛玻璃胶囊。
- 进阶液态版：SVG 滤镜 + 一张位移图（或实时生成） + 一点 CSS 变量控制强度。
- 顶级版：WebGL / AGSL shader（Android）、或者 metaball 几何计算。

性能上要注意：模糊和折射都是 GPU 重操作，层数多了会掉帧，所以好的实现都会做降级（低端设备只保留 blur + 描边）。

### 现在开源轮子已经非常多（直接抄就行）

Web / React 方向（和你之前研究的 shadcn / Kumo 生态高度兼容）：

- fluidkit：专门做 liquid glass + metaball 变形 + 弹簧，强调“表面变形、内容不动”。
- liquid-glass-react、glass-refraction、hyalite、各种 liquid-glass 仓库：真正做边缘折射 + 色差的。
- 完整组件库方向：Glin UI、OpenGlass UI、Intelli UI 等已经把 Liquid Glass 做成 design system 级别。
- 动画底座：Framer Motion / Motion + Tailwind，几乎是标配。

Android 方向也有原生 AGSL + Compose 的实现，社区库已经能比较接近苹果的效果。

Telegram 之所以没做得那么“明显液态”，是因为他们更追求轻量和一致性，只取了毛玻璃 + 丝滑过渡的部分，而不是全量光学折射。

### 总结一句话

这不是什么黑科技，而是：
- CSS backdrop-filter（基础）
- SVG 位移滤镜（液态边缘）
- 弹簧物理 + 形状/内容分层（丝滑 morph）

三者叠加后的结果。苹果把它系统化之后，大家就集体往这个方向卷了。

想动手的话，我可以给你：
1. 最精简的 CSS + SVG 液态胶囊模板（直接可复制）
2. 推荐几个目前最好用的 React 库 + 使用姿势
3. 或者专门针对 Dynamic Island 风格的 morph 动画拆解

你更想先从哪一层开始研究？
