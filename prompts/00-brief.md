# 00 · The brief

## The ask (the grower, 2026-09-28)

> Next I want to make the next tool to share for the coding workshop. This
> will be a scouting reporting tool for people's phones. It should have a
> setup page where people can input or upload the farms and locations and the
> list of pests they want to be prefilled, and any of the other items that
> should be dropdowns. It should be able to link to a Google Sheet and allow
> multiple people to submit to the same Google Sheet.

Then, after the first proposal:

> Photos should go to Google Drive. People will want it to be fairly simple.
> I don't think we need to have the life stage of the pest, just the pest,
> the severity and the distribution.

## What was proposed back, and decided

- **A static Nuxt app** on the Degree Days recipe (GitHub Pages, works
  offline, installable), with **no server of its own**.
- **The sheet is the backend.** A Google Apps Script, pasted by the nursery
  into its own sheet and deployed as a web app (*Execute as: Me*, *Who has
  access: Anyone*), receives reports and serves the lists. "Anyone" is what
  lets scouts send without a Google sign-in; a setup password guards the
  lists.
- **A report** = date and time (automatic), scout name (remembered), farm,
  then location (only that farm's), an optional crop, then one or more
  **pest lines: pest + severity + distribution**. No life stage, no action
  field. Optional notes, photos (to Drive) and GPS, each switchable in Setup.
- **Severity** None / Low / Moderate / High; **distribution** Single plant /
  Scattered / Patches / Throughout. Both editable.
- **"Nothing found here"** is a report too: a clean check is data.
- **The lists live on a "Setup" tab in the sheet**, readable by a person, so
  an owner can edit them in the sheet as well as in the app.
- **A share link + QR code** connects a scout's phone to the sheet in one
  tap.
- **English and Spanish**, and a **demo mode** that works with no sheet at
  all (for the workshop).
- Name: **Scout Report** (Spanish: *Reporte de Monitoreo*).

## Why build it at all

Paper scouting sheets get typed in late or not at all, and a shared
spreadsheet on a phone is miserable to fill in. A form with big buttons that
drops each pest into a row is the difference between scouting data you can
chart and a clipboard in a truck. Keeping the data in the nursery's own Google
account means nobody has to trust, or pay for, anybody's server.
