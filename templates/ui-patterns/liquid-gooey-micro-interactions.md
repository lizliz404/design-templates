# Liquid Gooey Micro-interactions

**Aliases:** Gooey effect · Metaball merge · Liquid UI · Blob physics
**Job:** 让相邻的 UI 元素像液滴一样黏滞融合、拉伸、回弹 —— FAB 菜单展开、Tab 滑块拖尾、开关形变、进度熔接。
**Why:** 传统 goo（`blur + contrast` SVG filter）的硬伤是滤镜层里的文字发虚、图标变形。`liquid-gooey` 用 **剪影层过滤镜 + 内容层保持清晰** 的双层结构解决，同时自带 spring 物理回弹。

**Reference implementation (npm):**
- `npm install liquid-gooey`（v0.2.1，MIT，Jakub Antalik）
- Playground / 参数试玩: <https://gooey.jakubantalik.com/>
- Repo（monorepo `packages/liquid-gooey`）: <https://github.com/Jakubantalik/Libraries>

```tsx
import { Liquid } from 'liquid-gooey'

export function PlusMenu({ open }: { open: boolean }) {
  return (
    <>
      <Liquid.Item x={open ? -54 : 0} y={open ? -34 : 0} transition="bouncy">
        …
      </Liquid.Item>
      <Liquid.Item x={0} y={open ? -64 : 0} transition="bouncy" delay={40}>
        …
      </Liquid.Item>
      <Liquid.Item>+</Liquid.Item>
    </>
  )
}
```

---

## 1. Names vs essence

没有统一官方名，搜索时用上面对齐到同一族技术。本质是一个 **双层合成**：

```
剪影层（过 SVG filter: feGaussianBlur + feColorMatrix alpha 对比度提升）
  → 相邻元素的模糊剪影互相黏连成 metaball
内容层（真实 DOM，无滤镜）
  → 文字 / 图标永远清晰
```

四个原生效果族：

| Effect | 语义 | 典型用法 |
|---|---|---|
| **Morph** | gooey merge · jelly shape change · contact dissolve | 菜单项展开融合、开关形变 |
| **Move** | liquid-rubber trails | Tab 滑块拖出橡胶拖尾、拖拽跟手 |
| **Melt** | 两张图互相熔接 | 状态图切换、hero 图过渡 |
| **Bend** | 主体随速度弯曲 | 卡片拖拽时的物理感 |

## 2. When to use / when not

| Use | Skip |
|---|---|
| 小面积固定 chrome：FAB / 悬浮菜单 / segmented control / tab 滑块 | 长列表、数据表格、正文区域（SVG filter 是逐帧光栅化，大面积 = 掉帧） |
| 一次一个焦点微交互，奖励探索 | 同屏多处 goo 叠加（注意力打架 + GPU 双倍税） |
| 操作反馈的"手感"层（配合既有语义状态） | 用 goo 代替状态本身 —— 必须仍有可见的文字/颜色状态（同 `uisfx-semantic-cues.md` 的铁律） |
| `prefers-reduced-motion` 降级为直接位移 | 无降级直接上线 |

**Anti-patterns**
- 把整页内容包进滤镜层求氛围（性能灾难 + 文字选择/可访问性破坏）。
- 移动端低端机不实测 —— filter 合成是重灾区。
- 多个 goo 组共享一个 filter region，边界裁切露馅。
- 用它掩盖加载/错误状态：它是糖衣，不是语义。

## 3. Integration notes

- 内容必须是真实 DOM（可聚焦、可选中、屏幕可读），剪影层纯装饰。
- 每个 goo 组用独立 stacking context 隔离，避免 z-index 与 sticky chrome 打架。
- 落地时先在 Playground 调好 `blur` / `contrast` 数值再抄回代码，不要凭感觉写。
- 与 `ai-thinking-orb` 互斥叠加：一个 surface 一个液体焦点即可。
- React 19 + Vite 环境直接可用；不依赖 canvas/WebGL，是 CSS/SVG 合成方案 —— 比任何 shader 方案便宜。

## 4. Checks

- [ ] 动画期间 DevTools Performance 无长任务，60fps。
- [ ] `prefers-reduced-motion` 下退化为无 goo 的直接过渡。
- [ ] 滤镜组内文字可选中、按钮可 Tab 聚焦、屏幕阅读器读出真实标签。
- [ ] 同屏只有一组 goo 焦点。
- [ ] 390px 触屏上无边界裁切与误触。

---

**Provenance:** upstream `liquid-gooey` v0.2.1 (MIT) by Jakub Antalik, <https://github.com/Jakubantalik/Libraries>。本文件只记录采用边界与机制，不 vendor 源码；安装走 npm。
