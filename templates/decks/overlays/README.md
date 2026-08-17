# Liz overlays on zarazhangrui decks

Patches applied by `scripts/sync-upstream-decks.sh` after each upstream rsync.

| File | Target | Intent |
|---|---|---|
| `frontend-slides-liz-paper-shaders.patch` | `upstream/frontend-slides/` | Paper Shaders texture source + verified opacity/animation kit (links pack `paper-shaders`) |
| `beautiful-html-templates.SKILL.md` | optional copy → upstream SKILL | Thin agent entry if maintained here |

## Refresh overlay from a dirty local clone

```bash
cd ~/frontend-slides
git diff > /path/to/design-templates/templates/decks/overlays/frontend-slides-liz-paper-shaders.patch
# test:
cd /path/to/design-templates/templates/decks/upstream/frontend-slides
git checkout .  # if a git dir — vendored tree is not git; re-rsync then:
patch -p1 --dry-run < ../../overlays/frontend-slides-liz-paper-shaders.patch
```

Keep patches small and upstream-friendly. Large forks belong in a separate branch story, not silent vendor edits.
