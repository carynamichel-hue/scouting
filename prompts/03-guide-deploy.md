# 03 · The guide, icons, this folder, the deploy

## The ask (the grower, 2026-09-29)

> Let's go back to finishing the scouting tool from yesterday.

## What was built

- `app/pages/guide.vue`: the guide as its own prerendered page, in English
  and Spanish (the app's language button switches it), written for someone
  handed a link: what it is, the scout's steps, the owner's steps, what lands
  in the sheet, and the things worth knowing (demo mode, who can see what, a
  forgotten password, updating the script, don't clear a phone with reports
  still waiting).
- Home-screen icons `icon-192.png` and `icon-512.png`, rendered from
  `icon.svg`. The 512 is not marked "maskable": the magnifier's handle sits
  outside the safe zone Android crops to, and would have been cut off.
- `prompts/`: this folder. It's copied into the public repo on every deploy,
  along with `apps-script/`, so a nursery can read the script before pasting
  it.
- `scripts/generate_pages.mjs` builds the site under `/scouting/`.
  `scripts/probe_built.mjs` serves that build under `/scouting/` (404
  everywhere else, as Pages does), starts its own mock sheet and headless
  Chrome, and runs the whole walk-through against it.
  `scripts/deploy_pages.mjs` is the gate: tests, build, built-site probe;
  then it replaces the deploy repo's contents, writes `.nojekyll`, stamps the
  service worker's cache name, commits and pushes. Nothing goes public unless
  every check passed against the exact build being shipped.

## What went wrong on the way

- **The probe's Chrome outlived the probe.** On Windows, killing Chrome's
  main process leaves its helpers running. The probe now kills the whole
  process tree.
- **A desktop headless screenshot at 390 px looked cut off.** Desktop Chrome
  won't make a window that narrow. A phone-emulated screenshot (and the
  probe's own "no sideways scroll" check) showed the page was fine.

## First deploy

1. Create a public repo `scouting` on GitHub and turn on Pages (Deploy from
   a branch: main / root).
2. `git clone https://github.com/carynamichel-hue/scouting.git C:\Users\caryn\dev\scouting-pages`
3. `npm run deploy:pages`. It's live at https://carynamichel-hue.github.io/scouting/
   a minute later.
