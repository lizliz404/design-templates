# 浏览器主线程很贵（要点）

来源：[kciter.so · The Browser's Main Thread Is Expensive](https://kciter.so/posts/the-expensive-main-thread/en)（长文，带可交互 demo）。以下为转述提纲，细节与 demo 看原文。抓取 2026-10-20。

- **为什么贵：** JS 执行、事件、网络回调、框架内部和 style → layout → paint 几乎全在主线程上排队，只有最后的合成交给 compositor。
- **帧预算：** 60Hz 每帧约 16.6ms，扣掉浏览器自身开销实际约 10ms；120Hz 再减半。超过 50ms 的任务算 long task。
- **体感：** 主线程被占时 JS 动画停、输入不响应，CSS（合成层）动画照跑。INP、TBT 本质上都在量主线程被堵多久。
- **在主线程内部分好时间：**
  1. Splitting：大块工作（如直播聊天一次涌入几百条）切成小片，片与片之间把主线程让出来。
  2. Batching：把零碎更新攒成一批，一帧只做一次 DOM / 布局。
  3. Prioritizing：用户输入、可见内容优先，其余让路。
  4. Deferring：不急的工作推到空闲时。
- **把工作移出主线程：**
  5. 交给 compositor：只动 `transform` / `opacity`，不触发 layout / paint。
  6. 交给 Worker：纯计算放 Web Worker。
  7. 直接消掉工作本身：最好的优化是不做。
- **pack 用法：** 做动效 / 实时数据界面时，先查动画是否只走 transform / opacity，再查有无 >50ms 的 long task。
