# 01 · The sheet script, tested without Google

## What was built

- `apps-script/Code.gs`: the whole backend, one file, commented for the
  person who pastes it.
  - `doPost` takes a report and writes **one row per pest** to the *Reports*
    tab. Every row of one visit shares a **Report ID**, and an ID already in
    the sheet is ignored, so a phone retrying on weak signal never writes a
    report twice.
  - Photos arrive as shrunk JPEGs and are saved to a **Scouting photos**
    folder next to the sheet; the row gets the links.
  - `doGet` returns the lists and settings from the *Setup* tab. Saving the
    lists needs the setup password (stored in Script properties as
    `SETUP_KEY`; the first save sets it).
  - Text that starts with `= + - @` is written with a leading apostrophe so a
    pest note can never become a spreadsheet formula.
- `test/fakeGoogle.mjs`: an in-memory stand-in for SpreadsheetApp, DriveApp,
  PropertiesService, LockService, Utilities and ContentService, close enough
  to run the **real** `Code.gs` in plain Node. It copies the Sheets
  behaviours that matter: a leading apostrophe is hidden, and an unguarded
  formula is flagged.
- `test/script.mjs` (33 checks): setup round trip, reports, duplicates,
  photos, the password, formula safety. `test/lists.mjs` (12 checks): the
  list parsing behind typing, pasting and uploading.
- `scripts/mock-sheet.mjs`: the same fake behind `http://localhost:3013/exec`,
  so the app and the probes talk to it exactly as they would to Google, with
  `/__state`, `/__reset` and `/__offline` for tests.

## What went wrong on the way

- **All 33 passed the first time**, which proves nothing on its own. Two
  deliberate breaks followed: removing the duplicate guard was caught. The
  second break didn't apply at first (the shell ate a backslash, so the
  character range quietly included digits). It was redone as a direct edit,
  and was caught too.
- **Apps Script doesn't answer a CORS preflight.** The app sends its POSTs as
  `text/plain`, which browsers send without asking first.
- **A web app not set to "Anyone"** answers with Google's HTML sign-in page
  instead of JSON. The app recognises that and says so in plain words rather
  than failing silently.
