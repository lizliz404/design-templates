# Saronic → CFE 可落地差异点（对照 DESIGN.md 现状）

> 前提：Saronic 是"国防新势力品牌势能站"，CFE 是"海工制造询盘站"——买家任务不同，下面只列**可借鉴的工程做法**，不是建议照抄。证据均见 `TEARDOWN.md` 同编号节。DESIGN.md 现状引用按 §x。

## 直接可学（机制级，不动现有决策）

1. **`gap:1px` cell 网格替代手写边框**（§5.3/§4.3 spec-grid/footer）：Saronic 的 VesselShowcase、Accordion、Footer 全部用 `display:grid; gap:1px; background:border色` + cell 实底产生发丝分割——比逐 cell 写 border 干净，天然不出双线。CFE spec-grid/目录行/footer 分栏可直接换这个机制，视觉仍是 1px 诚实边界。
2. **caption-small 唯一 mono 档**（§3.4 一致性）：Saronic 全站 mono 只有一个样式（12px/1.5/ls0/uppercase），所有 kicker/eyebrow/spec 标签/meta/MouseTracker 共用。CFE Geist Mono 使用面已扩到"标识与参数"，建议同样收敛为**单一 mono 档**、靠位置和颜色区分，不开第二个 mono 字号。
3. **深底灰 = 暖白透明度派生**（§2 同构确认）：Saronic 深底上的次级文字/边框全部 `sunlight100` 透明度档（5/20/35/50/70），浅底用 midnight 透明度——与 CFE "灰=墨/暖白派生"完全同构，确认方向正确；深底文案可直接抄这套 5 档透明度节奏。
4. **spear 记号**（§1 差异化候选）：Saronic 把品牌标里的"矛"形状做成 inline SVG 导语记号（`PageIntroParagraph_Spear`，高 1.2em、margin-right 1.2em，深底 sonar/浅底 beacon 变色）。CFE 可把 entity-tag 或一个小几何记号以同机制引入导语，成本一行 inline SVG。
5. **入场只用 translateY+opacity+clip-path**（§5.1 补充）：PageTitle 的 `clip-path:inset(0 0 100%)→0` + translateY(100%→0) curtain-wipe 巨标揭幕是 Saronic 最强识别点之一；CFE 可在页标上用同一招（≤1.2s，已在 A7 影像缓动额度内），零新依赖。
6. **规格数值/标签的字族切换**（§3.4 佐证）：Saronic 桌面 spec 值用 sans、mobile 改 12px mono——证明"同一语义不同载体换族"是被接受的工业站做法；CFE spec 值可保留 Manrope、标签 Geist Mono，不必全 mono。
7. **announcement ticker 已有现成模式**（A6 补充）：Saronic AnnouncementBar = 4 主题可换底（含 sonar/brand 色）+ 横向滚动隐藏条 + 16px 行 + 右侧 ×；CFE 若上集团资质/业绩 ticker，直接按此结构，色走钢蓝/墨不用荧光绿。
8. **菜单卡里藏 CTA**：Join Our Mission 是 menu 里唯一 sonar 实底卡——"6 卡中 1 卡当 CTA"的弱引导结构，CFE 若做抽屉/移动菜单可同理把 RFQ 做成唯一 accent 卡。

## 学了要改（机制可用，语义要换）

9. **抽屉菜单的取舍**：Saronic 用唯一 hamburger（CAREERS|MENU），省 chrome 但藏了所有入口；CFE 已有"扁平 5–6 项 + 常驻 RFQ"生效决策（DESIGN.md §0.1/§4.3），**不要学藏 CTA 进菜单**（R2 反面清单已记）。但 MenuLink 卡式抽屉 + slideIn .5s + ::backdrop 本身是干净实现，移动全屏菜单可借其结构与时长。
10. **scroll-snap 与 scrub 只做首屏**：Saronic hero 有 `scroll-snap-align:start` + JS 开关 snap、layout 层 scrub 渐隐 logo——**CFE Don't 表明确禁 scroll-jacking/强制滚动叙事**；若想要 hero 仪式感，只允许单次入场动画（已在 5.1 额度内），不上 snap/scrub。
11. **巨标尺寸上限 300px**：display-large clamp(64→300) 是"公司名/页名满屏"的自信排版；CFE 页标档 clamp(36–64) 已生效，若做 portalpha 式长文页（集团业绩叙事）可把 display-small 40→96 当长文页题——但首页 H1 维持 ≤10 词自我解释，不学"SaronIC 满屏字标"（新品牌没人认识字标）。
12. **方格纸纹理**：浅页底铺 40px 低透明度方格（inline SVG path）是"工程图纸"质感的最低成本实现；CFE 摄影主导已定，可在浅底 section（能力/规格区）加同款 ≤5% 透明度网格，比纯色多一层"制图"暗示，零素材成本。
13. **双 accent 高饱和（sonar+beacon）**：Saronic 用荧光绿+橙两个小面积 accent；CFE 已生效"钢蓝唯一 accent + 金受限"。启示是 accent 纪律不是数量而是**面积**：Saronic 荧光绿也只给 status 点/spear/按钮实底/announcement。钢蓝沿用同面积纪律即可，不需要第二 accent——除非把"受限金"的 focus 角色换成 beacon 类暖橙提升辨识度？【待 Liz 拍板·低优先】
14. **按钮文字 roll hover**：两 span translateY 接力（出 `.87,.01,1,1` + 入 `.06,1.02,.12,1.02`）+ scale(1.02)，是"Saronic 手感"的核心微交互；CFE `.btn` hover 现走墨系换色，可加同款 roll（纯 CSS、无 JS），但只给主 CTA，不给全部链接。
15. **spec cell 的"空位也是设计"**：`EmptyLabel` mono 小章处理未公开参数；CFE 18 产品多数无公开参数——对应"不伪造参数"红线，可把"暂无公开规格/Request datasheet"做成同款诚实空位件。
16. **表单巨型输入**：contact 页 input 桌面 **36px**、label 12px、focus sonar 边+圆点——CFE EnquiryDialog 输入现 16–18px；B2B 询盘不必学 36px，但"label 小 + 输入大 + focus 圆点指示"的层次可借，focus 换钢蓝。

## 明确不学（与 CFE 约束冲突或体量不配）

- **无 RFQ 主轨**：Saronic 全站无询盘 CTA（不缺单）；CFE 买家任务链要求 RFQ 常驻，不学。
- **ScrollSmoother/重叙事 scroll**：打 bundle 未激活，且 CFE 禁令明确。
- **GSAP 全站驱动**：CFE 渐进增强 + View Transitions 160ms 已生效，不引 GSAP。
- **深色主导**：Saronic 首页/产品页全深底；CFE 客户要求暖白纸面为主。
- **OG 只写 `Home`**：Saronic 分享卡是弱项，CFE §7.1 已要求分页面真实 OG。
- **hamburger-only 桌面导航**：见 #9。
- **菜单藏产品页**：Echelon/PortAlpha 不进菜单靠首页叙事接流量；CFE 产品目录必须可直达。

## 对 DESIGN.md 的具体补充建议（供 Liz 终审）

| 项 | 建议 | 证据 |
|---|---|---|
| §4.3 spec-grid/卡片 | 采用 `gap:1px` cell 网格写法 | §5.3 VesselShowcase/Accordion/Footer |
| §5.1 动效 | 页标允许 curtain-wipe（clip-path+translateY ≤1.2s，签名缓动 (.25,.25,0,1)）；文字 roll hover 仅限主 CTA | §5.2/§5.4 |
| §3.4 mono | 收敛为单一 caption-small 式档（12px/1.5/uppercase），spec/meta/kicker 共用 | §2.2 字阶表 |
| §4.1 间距 | Saronic spacing 刻度 2/4/8/16/24/32/40/64/80/120/160/200 + section 80→120→160 与 CFE 刻度高度重合，确认方向；`--page-margin` 16→24→32→40 响应式与 CFE gutter clamp 同构 | §4 |
| §4.2 表面 | Saronic 半径主用 4px（卡/按钮/菜单卡）+ 8px 大卡 + 16px 仅 EULA 门卡；支持 CFE 0–4px 上限判断，无阴影靠 1px 边 | §5.4/§3 |
| A2 规格单元格 | 直接参照 VesselShowcase 语义结构 dl/dt/dd + dot+label+value 单元 + 空位 EmptyLabel | §5.3 |
| §6.x 下载门 | Saronic 已有 EulaDocumentViewer（PDF iframe+EULA Accept+下载区）与 PasswordGate 两个门控组件实物——证明"文档门"在工业站是成熟形态，CFE Request document 语义正确，可参考其 Accept/Decline+iframe 结构 | §5.5 |
