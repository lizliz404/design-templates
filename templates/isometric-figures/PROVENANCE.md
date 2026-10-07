# Hairline · source and intake verification

- Repository: https://github.com/lucasmarkes/hairline
- Site: https://hairline.lucasmarkes.com/
- Skill examples: https://hairline.lucasmarkes.com/skill
- Fixed upstream commit: `bc782244216620434b14736df1d74daed2d05046`
- Source directory: [`skills/hairline-create`](https://github.com/lucasmarkes/hairline/tree/bc782244216620434b14736df1d74daed2d05046/skills/hairline-create)
- Local entry: [`SKILL.md`](./SKILL.md); complete unchanged upstream entry: [`upstream/hairline-create/SKILL.md`](./upstream/hairline-create/SKILL.md).
- Intake: 2026-10-07. Only the skill directory is retained, not the website, application, or whole monorepo.

## Files

Eleven upstream skill files are preserved byte-for-byte: `SKILL.md`, `concepts.md`, `rules.md`, `look.md`, `kernel.js`, `bench.html`, `build.mjs`, `validate.mjs`, `look.mjs`, `examples/terrain.js`, `examples/riffle.js`.

The repository's root notice is retained at [`upstream/LICENSE`](./upstream/LICENSE). File hashes are in [`upstream/SHA256SUMS`](./upstream/SHA256SUMS); run the check from `upstream/hairline-create/`:

```bash
sha256sum -c ../SHA256SUMS
```

Local `SKILL.md` is a routing/adaptation note, not a modified upstream instruction file. Future updates must choose a new upstream commit, refresh the complete skill folder together, verify hashes, and repeat example checks; do not hand-edit the kernel or bench.

## Checks performed

- Native Node `v24.15.0` assembled the upstream Terrain and Riffle examples into standalone HTML in a non-repository check directory.
- Both pages passed the upstream `validate.mjs`: embedded kernel and bench intact; figure syntax and static rules passed.
- Every retained skill file matched the downloaded fixed-commit source byte-for-byte.
- No custom illustration was generated, no runtime package or browser installed, and `look.mjs` was not run. Browser rendering, motion, accessibility and screenshot review remain unverified.
- Intake is source/static verification, not approval of an illustrated product screen.

## Pending neighbouring skill

`/isometric-objects`: https://x.com/anxndsgn/status/2107498432554475749

User supplied the source link and suggested that the skill may not yet be open-source. Extraction returned `SOURCE_NOT_AVAILABLE`; upstream source and publication status remain unconfirmed. Original prompt and the distinction from Hairline are preserved in the local entry. No unrelated isometric skill has been substituted.
