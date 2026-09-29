# How this app was built: the prompts

Scout Report was built in an evening (2026-09-28) and published the next
morning. It is the second worked example for a workshop on building your own
nursery tools with an AI coding assistant (Claude Code); the first was
[Degree Days](https://carynamichel-hue.github.io/degreedays/). This folder is
the part of the build you can't see in the code: **what was asked, in the
words it was asked in**, and what came back.

Read it in order. Each file is one step: the ask, the decisions, what was
built, and what went wrong on the way.

| File | What it covers |
|---|---|
| [00-brief.md](00-brief.md) | The brief, and the decisions made before any code |
| [01-sheet-script.md](01-sheet-script.md) | The Google Apps Script "backend", and how it was tested without Google |
| [02-phone-form-and-setup.md](02-phone-form-and-setup.md) | The report form, the Setup page, offline sending, and the end-to-end probe |
| [03-guide-deploy.md](03-guide-deploy.md) | The guide page, icons, this folder, and the deploy script |
| [HOW-TO-CUSTOMIZE.md](HOW-TO-CUSTOMIZE.md) | For the workshop: make it yours on a branch |

The script your sheet runs is in [`apps-script/Code.gs`](../apps-script/Code.gs).
Read it before you paste it; it is short and commented.

## The habits that mattered

- **Keep the backend in the customer's hands.** The only server is a script in
  the nursery's own Google Sheet. No account, no database of ours, nothing to
  keep running.
- **Test the real script, not a copy of it.** A small stand-in for Google
  (spreadsheet, Drive, script settings) runs the exact `Code.gs` a nursery
  pastes, so the tests and the local test server exercise the real thing.
- **Mutation-test a new test.** The script's tests were checked by breaking
  the script on purpose and watching them go red.
- **Probe the built site, not only the dev server.** The deploy runs the full
  phone-sized walk-through against the exact build about to go live, served
  under `/scouting/` the way GitHub Pages serves it.
- **Say what you can't test.** The one thing not tested here is a real Google
  account. That test is a person with a phone, and the Setup page is written
  so that person can do it alone.
