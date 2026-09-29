# 02 · The phone form, Setup, and the walk-through probe

## What was built

- **Report page** (`app/pages/index.vue`): name, farm, location, optional
  crop, pest lines with severity and distribution as big tap buttons,
  "+ Add another pest", "Nothing found here", notes, photos, GPS, Send.
  Farm and location stay filled in for the next stop.
- **The outbox.** A report that can't be sent is kept on the phone and sent
  when signal comes back; a badge on *Report* counts what is waiting. Photos
  are too big for ordinary browser storage, so the outbox lives in
  IndexedDB. Photos are shrunk on the phone before sending.
- **Setup page** (`app/pages/setup.vue`), five steps: make the sheet (with a
  copy-the-script button), connect (paste the web app URL), lists (type,
  paste a column from Excel, or upload Excel/CSV; switch crop, photos, GPS
  and notes on or off), save with the setup password, share (link + QR).
- **The share link** carries only the web app's ID. Opening it asks
  "Connect this phone?" and then loads that sheet's lists.
- `probes/flow.mjs`: a walk-through in a phone-sized headless Chrome against
  the mock sheet. The owner sets up and gets a share link. A scout on a
  "fresh phone" opens it and sends a two-pest report, which becomes two rows.
  Then: a photo landing in Drive, losing signal (queued, then sent),
  "nothing found", a CSV upload, Spanish, the guide, and demo mode.

## What went wrong on the way

- **A saved language or connection applied before the page finished
  loading gets overwritten.** Saved state is applied after hydration, and
  the share-link check waits for it. Otherwise a phone already on a sheet
  would be re-joined by any link it opened.
- **On a prerendered static site the query string is empty when a page
  mounts.** A small client plugin reads the URL first (a lesson carried over
  from Degree Days).
- The shared stylesheet only styled text and search inputs, so the URL and
  password fields looked unstyled until they got their own rule.
- The upload path wasn't covered by the first probe run. A check was added
  (a CSV of pests uploaded on Setup lands in the list) before calling it done.
