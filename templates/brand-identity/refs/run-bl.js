// bl vision anatomy runner — same pipeline as the 2026-08-31 refs run, encoding-safe.
const { execSync } = require('child_process');
const fs = require('fs'), path = require('path');
const DIR = __dirname;

const PROMPT = [
  '你是品牌标识解剖师。对这张图做逐层解剖，输出以下六节，每节给出具体到形状决策的判断：',
  '1) 剪影构造（几何骨架、正负形关系）',
  '2) 配色系统（色相数量、明度关系、渐变还是平涂、精确推测色值）',
  '3) 深度与光的处理策略',
  '4) 个性情绪从哪个具体形状决策来',
  '5) 小尺寸(16px)存活靠什么',
  '6) 让它显得 premium 的执行细节（比例、圆角、间距、收尾）',
  '之后另起一节「## 迁移到 Inquiry Foundry lockup」，给 3 条可迁移机制。目标 lockup：深蓝底（主色 oklch 0.485 0.291 264）+ 白色 F monogram 圆角瓦片 + 手绘 foundry 小写字标（首字母 f 借鉴树形分支结构）的横排组合，B2B 工具气质，克制、精密、不萌。每条机制指明从原图哪个具体决策迁移成什么。',
].join('\n');

const jobs = [['forest', 'ref2-forest.png'], ['bluetile', 'ref2-bluetile.png'], ['deepmind', 'ref2-deepmind.png']];
const manifest = [];
for (const [name, img] of jobs) {
  const imgPath = path.join(DIR, img);
  let ok = false, model = 'qwen3.8-flash';
  for (const m of ['qwen3.8-flash', '']) {
    const flag = m ? `--model ${m}` : '';
    try {
      const res = execSync(`bl vision describe --image "${imgPath}" ${flag} --quiet --prompt ${JSON.stringify(PROMPT)}`,
        { encoding: 'utf8', shell: true, maxBuffer: 32 * 1024 * 1024, timeout: 240000 });
      fs.writeFileSync(path.join(DIR, `ref2-${name}.md`), res, 'utf8');
      manifest.push(`ref2-${name} | lane=bl-${m || 'default'} | ok | bytes=${res.length}`);
      ok = true; model = m || 'default';
      break;
    } catch (e) {
      manifest.push(`ref2-${name} | lane=bl-${m || 'default'} | FAIL | ${String(e.message).split('\n')[0].slice(0, 160)}`);
    }
  }
  console.log(`done ${name} (${model}) ok=${ok}`);
}
fs.writeFileSync(path.join(DIR, 'manifest-ref2.txt'), manifest.join('\n'), 'utf8');
console.log(manifest.join('\n'));
