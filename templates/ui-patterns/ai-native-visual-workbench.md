---
name: ai-native-visual-workbench
description: >-
  AI-Native visual workbench interaction contract for non-designer
  knowledge workers: the 60/90/10 work-split (AI first draft → local AI
  refine → manual/export escape hatch), low-cognitive canvas chrome rules,
  selection-to-AI input routing (single composer quote chip vs anchored
  mini-input, with the industry verdict), eyedropper color-quote with the
  EyeDropper-API fallback ladder and canvas-taint rules, region/lasso select
  with a gesture-disambiguation matrix, plus accessibility & browser
  compatibility matrices. Use when building or auditing a chat+canvas
  surface (proposal deck, image workbench, marketing asset editor) whose
  primary user is a buyer/office worker, not a designer; when deciding how
  selections, colors, and regions reach the AI; when trimming heavy
  WPS/Figma-style manual tooling down to escape-hatch level. Not for
  professional design tools (Photoshop-class) where the canvas is the only
  surface and pixel craft is the job.
---

# AI-Native 视觉工作台 · 低认知交互合同

研究日期：2026-11-21。方法：Exa 一手检索（Lovart 官方 docs/changelog/官方教程视频、Gamma Help Center、Adobe 官方 Photoshop Generative Fill/Contextual Task Bar/adobe.design 研究复盘、Krea 官方 docs、Flora 官方 docs、Canva Help Center 摘要、MDN/caniuse/Chrome Developers）+ 本仓 `quote-into-composer` / `multi-pane-scroll-architecture` / `artifacts-canvas-workbench` 三份既有合同的对齐归纳。面向「对话 + 画布」双栏工作台，用户是**非设计师的商务人**（买手/运营/办公人员），不是像素工匠。每条结论标注一手来源；无来源的推导显式标「本文推导」。

一句话结论：**工作台按 60/90/10 分流——60% 交给 AI 出初稿，30% 交给「选中→让 AI 改这块」的局部精修，剩下的手动微调与导出做成逃生舱而不是主战场；画布 chrome 全部退到 hover/聚焦后温和浮出，主心智入口只有一句「让 AI 改这里」；一切选中物（元素/区域/颜色）走同一条「对象化引用 → 单一 composer chip」通路，不在画布上开第二套自由文本输入；取色用原生 `EyeDropper` + 同源 canvas 降级阶梯；区域框选做成显式工具态而不是隐晦的右键暗语，且必须先过手势消歧矩阵。**

与三份上游合同的分工：quote/引用对象合同（chip 形状、锚点降级、传输字段）→ [quote-into-composer](./quote-into-composer.md)；多栏滚动/壳层架构 → [multi-pane-scroll-architecture](./multi-pane-scroll-architecture.md)；画布 artifact 协议（版本模型、AI→canvas op 五派、选区锚四式）→ [artifacts-canvas-workbench](../artifacts-canvas-workbench.md)。本文只管「人怎么把手放到 AI 面前」的交互合同，不重定义协议层。

## 0 · 症状 → 对症速查

| 症状 | 对症 | 一句话机制 |
|---|---|---|
| 打开画布像「要来大干一场」：满屏把手、工具条、tab 浮条 | §2 | chrome 常驻=认知税；默认静默、hover/聚焦浮出、主动作唯一 |
| 选中一个元素出 8 个把手 + 蓝框 + 六键工具条 | §2 §3 | 选中态只回答一个问题「让 AI 改这里吗」，其余动作退居次级 |
| 想改图上一小块，只能重写整段 prompt 赌运气 | §1 §5 | 局部精修是 90% 主通道：Touch Edit/Change Region 类行业标配 |
| 「这块颜色不错」→ 没法把颜色告诉 AI | §4 | 取色是一等引用对象：hex 色卡 chip，复用 quote 通路 |
| 圈一块给 AI，右键/框选/拖拽/多选互相打架 | §5 | 先写手势消歧矩阵，再写代码；区域框选是显式工具态 |
| 画布上弹了第二个 AI 输入框，用户不知道该在哪说话 | §3 | 单输入焦点原则：选中物进唯一 composer；画布上只放按钮不放自由文本 |
| AI 改坏了/改多了，用户不敢用 | §1 §6 | 每步可撤销 + before/after 对照 + 「只改选中」的范围契约 |

## 1 · 60/90/10 分流：AI 出稿、AI 精修、人微调+导出

**是什么**：工作台的投入按三段分配——

| 段 | 谁干 | 干什么 | 行业一手证据 |
|---|---|---|---|
| **60% 初稿** | AI | 从 brief/结构化草稿一次性生成整页/整叠成品 | Lovart：agent 拆任务选模型铺画布（官方 blog「What Is Lovart」）；Gamma：prompt bar 一句生成全 deck（Help Center「Where do I start」） |
| **30% 局部精修** | AI | 选中一个元素/一块区域/一个标记点 → 一句话改局部，其余不动 | Lovart Touch Edit「四秒只改马克杯颜色，光照角度背景不变」（iteration-loop blog）；Krea Edit「name what should stay the same」；Gamma「The more specific your selection, the more targeted the fix」（Help Center AI editing） |
| **10% 手动+导出** | 人 | 改错字、挪一挪、换张图；然后导出 PPTX/PDF 回办公软件深排 | Gamma：「You never have to use AI for everything. Anything the agent creates, you can change by hand, and anything you change by hand stays put when you ask the agent for more」（Help Center，一字未改）；Lovart：导出各渠道格式 |

**为什么 10% 不是 30%**（决定不造精细手动排版的根本理由）：
- 精细手动排版是 WPS/PowerPoint 的主场，办公人员自己导出 PPTX 回 WPS 改那 10% 比在网页里学一套「类 Figma」顺手得多——本文推导，与 Gamma 定位一致（Help Center 明言 Gamma 不做像素级自由排版主场，grid/freeform 只到「precise control where things go」为止；第三方评测 aiwithvibes 同判「don't expect heavy customization」）。
- 行业没有一家 AI-native 工具把资源押在手动精排上：Lovart 把旋转杆都藏了（restyle 交给 AI 或导出），Canva Magic 系全部 prompt-first。反例对照：把 react-moveable 全把手 + 吸附 + 对齐工具链当主能力的画布，是给设计师的 Figma-lite，不是给买手的 AI 工作台。

**[硬] 人手改动必须被记住且不被 AI 静默覆盖**——Gamma 的「anything you change by hand stays put」是这类工作台的信任底线；落成协议就是 `artifacts-canvas-workbench` M1 版本账的 `origin/source` 标注 + AI 重排前显式询问。没有这条，60/90/10 的分工会在第一次「AI 把我调好的版面冲掉了」时崩塌。

**[POLICY] 精修闭环要可见**：AI 局部改动不静默落定——Gamma 用 Original/Modified 对照 + 单请求整批接受；Photoshop Generative Fill 出变体缩略图 + 非破坏 generative layer。最小实现 = 撤销一步可达 + 候选并排（不重排的旧版留在原地对比）。

## 2 · 低认知画布 chrome 合同（去「大干一场」压迫感）

七条规则，全部有行业先例：

1. **[硬] 静默默认，激活浮出**。逐页/逐元素的控制件常驻 DOM 但默认透明（`opacity:0`），`:hover` **与** `:focus-within` 双揭示，触屏/键盘走常驻兜底菜单——可及性依据同 [multi-pane-scroll-architecture §4](./multi-pane-scroll-architecture.md)。Lovart changelog 官方原话：Select/Hand/Mark 工具的目的是「keeps your focus on intent rather than interface mechanics」「reduces accidental edits」。
2. **[硬] 每屏只允许一个主 CTA 心智**。选中任何东西后，浮条的第一颗钮（或唯一文字钮）是「让 AI 改这里」；置顶/置底/字体/删除全部退为无文字 icon。Krea/Canva 的模式：AI 动作就长在手动工具旁边（contextual floating toolbar），不另立「AI 模式」入口——第三方 2026 盘点把它列为反模式的对立面（gummble：anti-pattern = hiding AI tools behind a generic "AI" button）。
3. **[硬] 选中态视觉只表达「已指认」，不表达「进入编辑软件」**。1.5px 柔和描边 + 极浅投影足够；把手缩小、降透明、hover 才全显；旋转把手这类「像素工匠动作」直接不渲染。对照 Photoshop 也只在选中后出 Contextual Task Bar（adobe blog：contextual bar 的存在意义就是「reducing the number of clicks」）。
4. **[硬] 撤销/重做/导出是逃生舱三件套，永远可达但不必显眼**。居中小药丸（撤销/重做 + ⋯）是收敛后的形态；导出 PPTX/PDF 放顶栏一次即可。Gamma 同款：两模式（铅笔/Agent）+ 左边一列 slide 级「Edit with Agent」。
5. **[POLICY] 页级浮签瘦身**：非焦点页只留页码，页名/尺寸/工具 hover 或聚焦才浮出；焦点页页签最多一行。
6. **[POLICY] 动效只做「即现即走」**：浮条 ≤150ms 淡入（同 quote-into-composer §4），选中闪烁 ≤1.5s 一次性脉冲，`prefers-reduced-motion` 全部降级。行业里 Lovart/Krea 的画布浮层没有任何弹性入场。
7. **[硬] 空白即撤销选中，Esc 即退工具态**。成熟画布共识：点空白=清选区、Esc=收单+归还焦点；工具态（框选/取色）必须能一键退出，否则「被迫学习」感立刻回来。

## 3 · 选择 → AI 的输入路由：单 composer vs 画布锚定小输入框

这是本合同最关键的裁决，行业存在两条真实路线：

| 路线 | 形态 | 一手证据 | 适用产品形状 |
|---|---|---|---|
| **A · 单一 composer** | 选中物（元素/区域/标记/色）变成主聊天输入框里的一颗引用 chip；输入焦点永远只有一个 | **Gamma**：「Click Agent… then click any element… It will show as selected in the left chat area」，改动都在 chat area 里描述（Help Center·AI editing）；**Lovart Touch Edit**：「Cmd/Ctrl and click… **the mark appears in the input box**」「select an image → it appears in the input box」（docs·Advanced AI Editing / Getting Started）；quote-into-composer 整份合同 | **左对话 + 右画布** 的 agent 工作台——对话是第一控制面，画布是产物面 |
| **B · 画布锚定小输入框** | 选中/点击处就地弹一个迷你 prompt 框，输入与提交都在画布上完成 | **Photoshop Generative Fill**：选区下方 Contextual Task Bar → 原地开 textbox（adobe.com/helpx）；**Lovart ChatCanvas**（官方教程视频实拍）：点画布任意处 → 就地小输入框打字 → add to Q/run this comment/run all；**Flora Inpaint**：mask 画完 prompt 框出现在图片下方（docs·Image Editing） | **画布是唯一工作面**的专业工具（Photoshop/Krea Edit 页），或以画布为中心、把 chat 降为辅助的 mode |

**为什么两条路线都「正统」**：B 的存在理由是专业工具里没有常驻对话面，prompt 必须跟着选区走；A 的存在理由是 agent 工作台里对话本身就是命令面，选中物必须被对话「收到」才能形成一次可追溯的请求（chip → 发送 → echo → 回锚，全链路在 quote-into-composer 已定义）。**判定问题只有一个：你的产品里，用户的「主场」是对话还是画布？** 主场在对话 → A；主场在画布且无对话面 → B。

**[硬] 同一产品内不得并存两套可提交的自由文本 AI 输入**。Lovart 是唯一同时有 A（Touch Edit mark → input box）和 B（ChatCanvas 就地框）的主流产品，官方自己也把它分成两个 feature 两个心智（docs 分列、快捷键不同）；第三方 30 天实测（reviewnexa）对 Lovart 界面的判词是「powerful, not simple… you might feel overwhelmed at first」——双输入面的认知代价是真实存在的，非设计师用户群（本合同的受众）付不起。

**裁决：agent 工作台形状（左 chat + 右 canvas）取 A，并从 B 借「锚定感」但不借输入框**——

- 选中/框选后画布上保留轻视觉选中框 + 角落一枚**动作药丸**（按钮，非输入框）：主钮「引用到对话」/「让 AI 改这块」，点击即落 chip 进唯一 composer（Gamma 同款）；药丸可以带 1–2 个零输入预设（如「续改此图」= 预填半句话进 composer），但**不出现第二个自由文本框**。
- chip 即时反馈锚定感：chip 带缩略图/色块/坐标标签，发送后 echo 可点回画布高亮（quote-into-composer §6 合同）。
- 眼动成本（选中在右、chip 在左）用两招压平：①窄屏/抽屉态自动切到对话栏；②落 chip 时画布侧给一次性轻提示（selection 矩形保留 + 短 toast「已引用到对话」），不靠用户扫视确认。
- Lovart ChatCanvas 里值得另抄的一点不是浮框而是**队列**：多个局部意图可先攒后跑（add to Q → run all）。A 路线下等价物 = composer 天然支持多 chip/附件排队（先圈三块再一句「依次改成…」），不需要新机制。

## 4 · 取色引用：EyeDropper 原生 + 降级阶梯 + 色卡 chip

**是什么**：用户在某张商品图/候选图上看中一个颜色 → 点「取色」→ 得 `#RRGGBB` → 变成 composer 里一颗**色卡 chip**（色块圆点 + hex + 「来自：××图」标签）→ 发送后 AI 可把它写进结构化字段（产品色板 `colors[].hex`）或生图参数（colorways 色变体描述）。取色是一等引用对象，复用 quote 通路，不开新协议。

**为什么**：颜色是这类工作台里唯一「用户看到但说不清」的值——色名主观（「雾霾蓝」≠模型理解的同一色），hex 是唯一无歧义载体。原生 API 的价值在于能取**屏幕任意处**（含画布外），MDN 明示这是它与一切自造方案的差值。

**浏览器事实（2026-11 检索，写实现前照抄）**：

| 环境 | EyeDropper | 依据 |
|---|---|---|
| Chrome/Edge 桌面 ≥95（2021 起） | ✅ | caniuse `mdn-api_eyedropper`；Chrome Developers 官方文档 |
| Firefox 全平台 | ❌ 无支持记录 | caniuse / OpenPWA 汇总（引用 mdn browser-compat-data） |
| Safari 桌面/iOS | ❌ | 同上 |
| Chrome Android / WebView / 三星 | ❌ | 同上 |
| **Linux X11** | ✅ | OpenPWA 引 crbug 40720753 |
| **Linux Wayland** | ❌（窗口协议限制） | 同 crbug 40720753——注意：开发者自己的 Wayland 桌面正是盲区，验收必须换设备/浏览器组合 |

**[硬] 合同细节**（MDN EyeDropper API / Chrome Developers 原文）：
- 仅 **secure context**（HTTPS）可用；必须由**瞬时用户激活**触发（点击处理器内调用），否则 `NotAllowedError`；重复打开 `InvalidStateError`；Esc 中止 `AbortError`（可传 `AbortSignal` 主动收）。
- 返回 `{ sRGBHex: '#RRGGBB' }`（sRGB）；浏览器自带放大镜 UI + 启动延迟（隐私设计），产品侧不要再叠引导动画。
- 特性检测 `'EyeDropper' in window`，失败静默走降级，不给报错。

**降级阶梯**（Firefox/Safari/Wayland 必须优雅，不许 404 式死路）：
1. **原生 EyeDropper**（Chromium 桌面）。
2. **同源 canvas 放大镜取色**（一切不支持原生 API 的环境）：把用户点「取色」时的**目标图片**画进离屏 `<canvas>`，pointermove 用 `getImageData(x,y,1,1)`（可加 5×5 均值抗锯齿）读 hex，旁边放一个像素放大镜 UI；点击确认、Esc 取消。语义诚实：只能取**这张图内**的颜色，不假装能取全屏（bestpractic.org 2026-09 的判词：「no polyfill worth using」全屏版，canvas 版就限定在图内）。
3. **`<input type="color">` 兜底**（图字节拿不到时）：OS 色板 + 文案「当前浏览器不支持从图取色，可手动选一个接近色」。比死掉诚实，比造 getDisplayMedia 取屏方案便宜三个量级。

**[硬] Canvas taint 规则**（降级 2 的生死线，MDN「Use cross-origin images in a canvas」/getImageData 原文）：
- 画进 canvas 的图**只要有一张跨域且未 CORS 批准，`getImageData`/`toBlob`/`toDataURL` 全部抛 `SecurityError`**——不是返回坏值，是整条读回通道被封。
- `data:` URL、站内相对路径：天然同源，安全。
- 跨域 `https://` 图：要么服务端**同源代理**（图 URL → `/api/img?u=…` 一类自家端点，字节同源回传，canvas 永不污染），要么 `crossorigin="anonymous"` + 对端 `Access-Control-Allow-Origin`。代理路径优先：不需要对端配合、不改 `<img>` 渲染链。
- **[硬] 降级取色永远从「代理后的字节」画 canvas**，不从渲染中的 `<img>` DOM 抓——渲染图可能带 CSS 缩放/滤镜，像素与原字节不一致，取出的色会偏。

**色卡 chip 合同**（[POLICY] 形状，[硬] 语义）：
- chip = 色圆点（14px 左右，描边保证深浅底都可见）+ hex 等宽字体 + 来源短标签；echo 同族。
- 语义 [硬]：色值是**六位 hex 的引用对象**（带来源锚：哪张图、哪个元素），不是一句「用雾霾蓝」的散文；hex 进结构化字段/参数（色板字段、colorways），色名只作为给人读的 `name` 附带。Adobe 的教训反面：Reference Image 研究里用户分不清「参考图」与「prompt 的关系」导致大量误用（adobe.design 复盘 Round 1）——颜色这里把「值」与「话」分家，天然避开同坑。

## 5 · 局部框选：工具态 + 手势消歧矩阵 + 载荷阶梯

**是什么**：用户在画布上拖一个矩形（或点一个标记）圈出一块 → 轻选中框 + 角落动作药丸 → 「引用到对话 / 让 AI 改这块」→ chip（锚 + 缩略）落 composer，可附带裁剪出的区域图作为真实参考。行业名目：Lovart Move Object「Drag a rectangle or lasso」（docs·AI Transformation）、ChatCanvas「click and drag to select this specific area」（官方教程视频）、Krea Change Region「brush / rectangle / Auto Mask hover 自动识别」（docs·Edit）、Flora Fashion Studio「Auto detect finds the garments… click a garment, no mask painting」。

**[硬] 框选必须是显式工具态，不是隐晦手势暗语**。四家一手证据全部是「先进工具/模式，再拖框」：Krea/Flora/Photoshop 是工具栏模式；Lovart ChatCanvas 是「chat with canvas」模式激活后才 click-drag。没有任何一家把「裸右键拖拽」当唯一入口。理由（本文推导 + changelog 佐证）：裸手势与既有选择/平移/右键菜单三方冲突且不可发现。落地：工具栏一枚「框选引用」钮（快捷键 R 级别），激活后拖矩形，Esc/右键即退出；**右键长按拖动可作为快捷方式并存**，但必须先过下面的消歧矩阵。

**手势消歧矩阵**（[硬] 写代码前填完这张表；任何一格含糊都会变成线上「框不出来/误删/菜单乱弹」）：

| 手势 | 落点 | 归属 | 规则 |
|---|---|---|---|
| 左键拖 | 空白页底 | 既有框选/清选中 | 不动 |
| 左键拖 | 元素上 | 既有移动 | 不动 |
| 左键拖 | 框选工具态激活时 | 区域框选 | 工具态独占，临时挂起既有框选/移动 |
| 右键点（无位移） | 任意 | **原生 context menu** | 不吞——用户右键图看「另存/复制」是既有习惯 |
| 右键拖（位移 >6px 或按住 >250ms） | 页内 | 区域框选（快捷方式） | 仅拖动确认后 `preventDefault` contextmenu；纯点击放行原生菜单 |
| Shift+左键拖 | 空白 | 既有加选 | 不动 |
| Alt/Ctrl+左键拖 | 元素 | 既有复制拖 | 不动（若已占用则框选快捷键换修饰键） |
| 触屏长按 ≥500ms | 页内 | 区域框选（次级） | 桌面优先产品可后置；实现时需与系统长按选择（`user-select`）划清 |
| 滚轮/双指滚动 | 任意 | 页面滚动 | 不动（画布自吃滚轮，见 multi-pane §3） |
| Esc | 框选中/选中态 | 退出工具态→清选中 | 两级退出，一级一义 |
| 编辑态/菜单开着 | — | **框选挂起** | 与 text 编辑、弹出菜单互斥，谁激活谁赢 |

**区域载荷阶梯**（区域框选拿什么喂 AI，按可裁剪性降级，不许跳级造假）：

1. **裁剪 PNG → 会话附件**（区域 ≥80% 覆盖单一图片元素，图字节同源可得）：从**原始字节**（data:/站内/代理 URL）`drawImage` 裁剪 → PNG → 走既有会话附件通道（上传 → `att:` 引用），生图模型按既有 refs 合同直接吃。像素是真的，模型看得见。
2. **坐标+元素锚 chip**（区域横跨文字/表格等不可裁剪内容）：chip 载「第 N 页 · 区域 (x,y,w,h) · 覆盖元素 <ref 列表>」，模型按元素级块改写（artifacts-canvas-workbench M2/M3 的块级改写路线），不做像素幻觉。
3. **两者并送**（1 可得时）：锚 chip（where）+ 附件（what）同发——与 Adobe Reference Image 的教训一致：视觉参考与文字指令要能分清谁是谁，两个通道天然分清。

**[硬] 跨域与 taint**：裁剪只能从同源字节画布做；渲染中的元素可能带 CSS `zoom`/transform——**坐标换算必须除以缩放比**再进裁剪数学，用 `getBoundingClientRect()` 的视口值反推页内坐标，不许拿 CSS 像素当图像像素。

**框完直发 vs 框完点一下**（Liz 的自问，正面对比）：

| 方案 | 路径 | 利 | 弊 |
|---|---|---|---|
| 框完直发（松手即送 AI） | 最短 | 快感强 | 误触即烧一轮生图（真金白银 + 30–55s 等待）；框错了没退路；多区域叠加意图没表达口 |
| 框完点一下（松手 → 药丸 → 点「改这块」） | +1 次点击 | 意图确认明确；chip 阶段可改可弃；可攒多区域再一句话总发 | 多一次点击 |
| **裁决** | | **点一下**。生图类动作贵且慢，确认成本 1 次点击远低于一次误生成；且点一下的「一下」落在同一块肌肉记忆上（Gamma 的 selection→chat-confirmed 也是两段）。**[POLICY] 直发只允许出现在零成本只读动作上**（如「放大此区域」），一切触发模型调用的路径必须过 chip 确认。 | |

## 6 · 无障碍与浏览器兼容矩阵

**无障碍 [硬]**：
- 浮层药丸 `role="toolbar"` 单 tab 站（同 quote-into-composer §7）；按钮带 `aria-label`/`title`，焦点归还触发钮（菜单/药丸关闭后）。
- 框选工具态必须有**键盘等价路径**：Tab 到元素 → Enter 发起引用（元素级已有则复用）；区域级键盘路径可以用「选中元素后引用」覆盖大多数场景，纯像素区域对键盘用户本就是画布产品公认缺口，不假装无障碍（对标：无一家同类产品有键盘 lasso）。
- 取色降级放大镜：`aria-live` 播报当前 hex；色 chip 的可及名 = 「颜色 #RRGGBB，来自××」，不只靠色块视觉。
- 颜色对比不依赖唯一通道：色 chip 有 hex 文本，不只靠圆点颜色（色弱可读）。
- `prefers-reduced-motion`：§2 全部动效降级，选中闪烁改即时描边。

**兼容矩阵**（影响面 → 最低要求）：

| 能力 | Chromium 桌面 | Firefox | Safari | 触屏 | 降级 |
|---|---|---|---|---|---|
| 单 composer chip 路线 | 全支持 | 全支持 | 全支持 | 全支持 | — |
| 原生 EyeDropper | ✅（X11；Wayland ❌） | ❌ | ❌ | ❌ | §4 阶梯 2/3 |
| 同源 canvas 取色/裁剪 | ✅ | ✅ | ✅ | ✅ | 需代理跨域图 |
| 右键拖框 | ✅ | ✅ | ✅（macOS ctrl-点语义冲突 → 用工具态为主入口） | ❌ → 长按 | 工具态按钮永远在场 |
| context menu 保留 | ✅ | ✅ | ✅ | — | 纯右键点击不吞 |
| 附件上传（裁剪 PNG） | ✅ | ✅ | ✅ | ✅ | 上传失败 → 坐标 chip 兜底 |

## 7 · 验收清单

- [ ] 打开空白/初稿画布：无选中时可见 chrome ≤ 1 个浮层（工具药丸），页签非焦点页只剩页码
- [ ] 选中元素：柔和描边 + 药丸，第一动作是「让 AI 改这里」，杂项动作 hover 才显
- [ ] 引用 chip 落 composer：带缩略图/色块/标签，可 × 删除，空输入不可发送
- [ ] 发送后 echo 单行同族块，点回画布高亮命中（三级回退）
- [ ] Firefox/Safari 点取色：进入图内放大镜降级，Esc 取消，取色值与 Chromium 原生一致（±1/255 级）
- [ ] Wayland Chromium：取色自动走降级，无报错无死按钮
- [ ] 跨域图取色/裁剪：走代理字节，无 `SecurityError`
- [ ] 框选：工具态内拖矩形流畅，Esc 两级退出，纯右键点击仍出原生菜单
- [ ] 框选区域 → chip + 附件两通道各自可见状态（上传中/失败如实显示）
- [ ] `git status`：消费仓零无关改动；本模式不新增后端 schema

## 8 · 反模式

- **双输入面**：画布上再开一个可提交的自由文本 AI 输入框——非设计师用户立刻不知道「该在哪说话」，IME/草稿/队列/焦点管理全部双份（§3 裁决）。
- **裸右键拖当唯一框选入口**：与原生菜单/既有框选/移动三方暗冲突，不可发现（§5）。
- **选中态开成编辑软件**：8 大把手 + 旋转 + 对齐线全套常驻 = 把 10% 逃生舱升成了主战场（§1/§2）。
- **取色只做 Chromium 原生**：Firefox/Safari/Wayland 直接死按钮（§4 矩阵）。
- **从渲染 DOM 抓像素**：CSS zoom 下坐标全错 + 跨域 tainted canvas 全灭（§4/§5 [硬] 条）。
- **色值走散文不走值**：把颜色当「把这张图调暖一点」的话术而不是 hex 对象，模型每次一个样。
- **框完直发生图**：误触一次烧一次钱，用户从此不敢拖（§5 权衡表）。
- **AI 改动静默落定**：没有 before/after 与撤销，60/90/10 的信任在第一次翻车时归零（§1 [硬]）。

## 9 · 产地与一手来源（本会话 Exa 实开）

- Lovart docs：Advanced AI Editing（Quick Edit Tab / Mark M / Cmd+Ctrl+Click / mark appears in the input box / ≤10 marks）、Customize Your Canvas（Select V / Hand H / 顶栏 quick actions / 右键菜单）、AI Transformation（Move Object rectangle/lasso）、Getting Started
- Lovart 官方 ChatCanvas 教程视频（youtube.com，Lovart AI 频道）：click anywhere & talk、click-drag 选区作 reference、add to Q / run all、参考图 click-to-use
- Lovart blog「The Iteration Loop」（2026-07-22）：Touch Edit 语义分割原理、四秒局部改、无 mask、Cmd+Z 历史；changelog（2025-11-24 Touch Edit tools 发布语）；「What Is Lovart」（2026-10-19）
- Gamma Help Center：How do I edit my content with AI（Agent 模式、元素选中显示在左 chat area、quick edit、Original/Modified、手改保留原则原文）、Where do I start when adding content（手改保留原文重申）、How do grids and freeform editing work（「You do not need to learn the new model before you can work」）
- Adobe：Photoshop Generative Fill 产品页（Contextual Task Bar → textbox → 变体 → generative layer）、helpx Contextual Task Bar（on-canvas 接口定义）、adobe.design「Behind the design: Reference Image」（参考图与 prompt 关系混淆的轮次研究）、adobe blog 2023-05（contextual bar 定位原文）
- Krea docs：Edit（Change Region brush/rectangle/Auto Mask、Annotate 多区域各配一 prompt、Draw、History）、Krea Academy（「name what should stay the same」prompt 纪律）、Realtime、Nodes
- Flora docs：Image Editing（Inpaint 绿十字纹、prompt 在图下方、@mention 参考图、模型 mask 格式自适应）、Fashion Studio Auto detect、Fauna（区域涂画+逐区 note、选色板）
- Canva：Help Center 摘要（Magic Edit Brush/Click/All + prompt；brush 模式下 zoom/undo 被禁用的告诫）
- 第三方归纳（对照用）：Hao Wu「Design for AI 2」六交互模式；gummble「Best AI Photo Editor Apps 2026」五型模式与 anti-pattern；terryjohn.me Magic Canvas 案例（prompt 锚定在选区旁）；reviewnexa Lovart 30 天实测（「powerful, not simple」）；bestpractic.org（2026-09，无全屏 polyfill 判词）；OpenPWA 兼容表（crbug 40720753 Wayland 脚注）
- 浏览器真源：MDN EyeDropper API / EyeDropper.open / getImageData / CORS-enabled image；caniuse mdn-api_eyedropper；Chrome Developers EyeDropper 指南
- 本仓上游合同：quote-into-composer、multi-pane-scroll-architecture、artifacts-canvas-workbench（全文本会话重读）
