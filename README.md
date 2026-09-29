# Scout Report

**Scouting reports from the phone to your own Google Sheet.** A scout picks
the farm and location, then taps each pest's severity and distribution. Many
people can send to the same sheet, and every pest found becomes a row. It
works with no signal, needs no accounts, and the data stays in your own Google
account.

**Live: https://carynamichel-hue.github.io/scouting/**. Open it on a phone
and "Add to Home Screen". The 📖 guide inside explains everything, and
"Try it without a sheet" shows it working before you set anything up.

This repository holds only the **built site**. What you *can* read here:

- [`apps-script/Code.gs`](apps-script/Code.gs): the script that goes into
  your Google Sheet. It's the tool's only "server". Read it before you paste
  it; it's short and commented.
- [`apps-script/appsscript.json`](apps-script/appsscript.json): its settings
  file. It limits the script to **that one sheet** and **the photos folder it
  creates**, nothing else in your Google account.
- [`prompts/`](prompts/): how the app was built in an evening with an AI
  coding assistant. It covers the brief, each step, what went wrong, and how
  to make it yours.

Built by Caryn A. Michel, Overdevest Nurseries, with Claude Code.
