---
name: isometric-figures
description: >-
  Isometric interactive SVG object authoring with Hairline. Use when making a
  pointer-responsive line illustration, a physical-object metaphor, an empty
  state, or a small hero; also routes hairline-create and records the pending
  isometric-objects source. Not a diagram engine or an image-generation prompt.
---

# Isometric figures · Hairline

为网页做一件能响应指针的等距线稿物体；不是静态图标合集，也不是默认给说明图加 3D。已收可执行的 **hairline-create**；另一个 **isometric-objects** 目前只保存用户提供的来源，不冒名替换。

上游：[Hairline 站点](https://hairline.lucasmarkes.com/) · [skill 演示](https://hairline.lucasmarkes.com/skill) · [GitHub](https://github.com/lucasmarkes/hairline)。完整 skill 固定于 `bc782244216620434b14736df1d74daed2d05046`，入口是 [`upstream/hairline-create/SKILL.md`](./upstream/hairline-create/SKILL.md)；来源、文件 hash 与 intake 检查见 [`PROVENANCE.md`](./PROVENANCE.md)。

## 流程

1. **先选用途**：需要现成键盘、终端、机柜等物体时，先看官网库；确实要新物体/新手势才用本 authoring skill。静态结构关系说明先走 [visual-economy](../decks/visual-economy.md)，稳定功能图标走 [icon-system-craft](../ui-patterns/icon-system-craft.md)。
2. **选择记录**：按 [pack 主路由](../README.md) 写 Job / Chosen / Why / Skipped / Acceptance。说明物体服务的真实语义；不只因为“等距很酷”。
3. **概念**：读上游 `concepts.md`，提出 2–3 个「物体 + 指针动作 + 短 read-out」；用户已给出物体和动作时跳过选题。先列物体的 2–3 个辨识特征，静止时也能认出，不能靠 caption 救图。
4. **构建**：读上游 `rules.md`、`kernel.js` 顶部 API 索引及最贴近的例子；只在消费项目写 `<name>.js`。保持 `kernel.js`、`bench.html` 原样，不在 pack 写任务成品。
5. **静态检查**：在消费项目工作目录运行（`SKILL_DIR` 指向本资产下的 `upstream/hairline-create`）：

   ```bash
   node "$SKILL_DIR/build.mjs" ./<name>.js
   node "$SKILL_DIR/validate.mjs" ./hairline-<name>.html
   ```

6. **视觉检查**：读 `look.md`，给真实应答部位的世界点，运行：

   ```bash
   node "$SKILL_DIR/look.mjs" ./<name>.js --answer x,y,z --edge x,y,z
   ```

   看静止/应答、240px、强度两端、明暗两主题；检查遮挡、稳定命中、无出框、console 和 read-out。脚本通过不代替看图。`look.mjs` 首次会在用户 cache 安装 `playwright-core`，需要 Chrome 或 Playwright Chromium；先核现有浏览器，不为了收录 skill 自动装浏览器。
7. **交付/调整**：交付 `<name>.js` 和自包含 `hairline-<name>.html`，说明隐喻、规则和未验证项；调整只改 figure 并重验。无浏览器时如实标“未在浏览器实看”，不能称视觉验收完成。

## 机制依据

十条完整规则以 `upstream/hairline-create/rules.md` 为准：

- **命中稳定**：用静止/目标姿态，不用当前移动边缘，否则 hover 抖动。
- **扩散有序**：离指针越远延迟越大，不按固定列表顺序；reach 有界。
- **线条即强调**：轮廓、暗内线与一个高亮位置；不另加颜色、glow 或 shadow。
- **静止可辨**：rest 是缩略图，不是空网格；空状态画“有容器但没有内容”，不是悲伤脸。
- **遮挡诚实**：不透明底板和由远到近的 painter order，不能让后面的线穿过前面的物体。
- **共享时钟**：用 `HL.register`，稳定/离屏时休眠；离散选择走 tween，连续指针走 spring；reduced-motion 由引擎处理。
- **圆角与减线**：一个 solid 是 silhouette + crease，而不是十二边立方体。
- **图内安静**：名称到外部 read-out；品牌 mark 可以成为主体物体，不是贴在另一个盒子上当标签。

`mount({ stage, svg, read }, value)` 返回 `{ set, destroy }`；`range` 给 slider 在 0 / 0.5 / 1 的实际单调参数，**不是把 mount 的 value 当 0–1**。固定 viewBox 400×320，默认相机 `Cam(45, 0.5, S)` 为 2:1 视图；消费图形最多 200 行。

## 边界

- 适合 empty state、轻量 hero、对象隐喻、交互插图，不充当业务按钮、真实状态或数据图表。
- 单文件 HTML 的运行不依赖 npm；构建/静态验证需要 Node。使用现成 React/DOM 库是另一条消费路线，不在本 pack 安装整个应用或运行库。
- 交互不能是理解图形的唯一途径：rest 必须成立，重要信息与操作仍放在真实 UI；键盘和读屏验收由消费页面承担。
- 一件物体、一种主要动作；不叠出复杂场景，不与 shader/orb 再堆一套抢注意力的动态表面。
- 精确品牌形状从可信 SVG 源取，不让文本/图像生成器猜；图形主体/mark 的约束按 Hairline 规则执行。
- 本次仅验证 intake、来源一致和两个上游例子的 build/static validate；未生成定制图，未验浏览器视觉，不把它说成生产接入。

## 邻近来源：isometric-objects（待补原 skill）

用户提供原帖：[anxndsgn / X](https://x.com/anxndsgn/status/2107498432554475749)。用户判断“似乎还没开源”；本次页面抓取 `SOURCE_NOT_AVAILABLE`，**未确认发布状态，也未找到可归属的 skill 源码**。只保存线索，不虚构安装命令，不用近似仓库替代。

用户引用的 prompt 原样：

> The prompt: "/isometric-objects i would like another svg isometric but this time it will be a physical old screen like Apple first PC with the logo of anthropic on the screen, and we like to have a keyboard with a cable"

这不是 Hairline 的指令：其中“屏幕上贴 Anthropic logo”与 Hairline「mark 是主体，而非另一件物体的标签」不同。原 skill 可取得后，再研究其造型/动效/输出合同并从这里补入口；现在不把该 prompt 改写成已验证 Hairline 例子。
