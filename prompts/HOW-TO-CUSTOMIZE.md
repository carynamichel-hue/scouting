# How to make it yours, on a branch

You don't need to change any code to use Scout Report: the lists, the
severity and distribution choices, and which fields show are all on the
Setup page. This is for changing the app itself.

## What you need

A GitHub account, Node 20 or newer, Google Chrome, and an AI coding assistant
that can run commands (Claude Code was used here).

## Steps

1. **Get the source** and open the `scouting-nuxt` folder in your assistant.
2. **Run it**: `npm install`, then in two terminals `npm run mock` (the
   stand-in Google Sheet on port 3013) and `npm run dev` (the app on
   http://localhost:3012). On Setup, connect to `http://localhost:3013/exec`.
3. **Make a branch**: `git checkout -b my-nursery`.
4. **Ask for the change in your own words.** Good first ones:
   - "Add a 'Beneficials seen' yes/no to each report and a column for it in
     the sheet."
   - "Make severity a 0–5 number instead of words."
   - "Add a 'Treated today?' checkbox per pest."
   - "Default the app to Spanish."
5. **Insist on the checks**: "run `npm test` and the flow probe before you
   say it's done." If the sheet script changed, "add a test to
   `test/script.mjs` that would have failed before, and show me it failing."
6. **Build and probe the built site**: `npm run generate:pages`, then
   `npm run probe:built`.
7. **If you changed `Code.gs`**, paste the new version into your sheet's
   Apps Script and publish it: Deploy → Manage deployments → edit → Version:
   New version. The web app URL stays the same.
8. **Deploy your own copy**: create your own public repo, change the repo
   path and the live URL in `scripts/deploy_pages.mjs`, then
   `npm run deploy:pages`.

## What to keep

- **The script and the app change together.** A new field has to be in the
  form, in the report `Code.gs` receives, and in `REPORT_HEADERS`. The flow
  probe reads the rows back, so ask it to check the new column.
- **Retries stay safe.** Keep the Report ID check in `Code.gs`; phones on
  weak signal will resend.
- **Nothing formula-shaped reaches the sheet unguarded.** Keep the leading-
  apostrophe rule for any new text field.
