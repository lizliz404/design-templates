ROUND 1 of 3. Slow. You implement yourself. Do NOT spawn Task/Agent subagents. Do NOT touch 02 or 03.

Cwd: D:\dev\repos\design-templates\templates\lab

1. Read 01-glass-cubes.html and source-ox-alpha.txt (case 1 only).
2. python -m http.server in this folder (log + stop command).
3. Use Playwright MCP on ONLY http://127.0.0.1:<port>/01-glass-cubes.html
   - wait for canvas
   - screenshot to shot-01.png (this folder)
   - drag once, screenshot shot-01-drag.png
4. Fix this one file only if a must is actually missing: two glass cubes; offscreen type plane behind glass; transmission 1, ior 1.44, dispersion 1, clearcoat 1; grain+mist; inertia; opposite parallax.
5. Stop. One short paragraph in the terminal: what you saw, what you changed (or "no edit").

No NOTES.md rewrite. No pack README. No commit. No 02/03.
