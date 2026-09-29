# 04 · The first real Google test: scary warnings, ranges, typing to find

## The asks (the grower, 2026-09-29, during her first real Google test)

> Google is giving me warnings: "This app hasn't been verified by Google…"

> It is asking me to give the project permission to see, edit, create and
> delete Drive files and Google Sheets. It needs that access, but can we make
> sure it doesn't have the ability to delete anything?

> I allowed it, I just don't want people afraid to use it because they see
> scary warnings.

> Since most people using the report form on a phone will not need the setup
> once it's done, can we hide the setup and the guide in a gear icon? Also,
> for flexibility we should have Farm, Range and Location, since farms may be
> broken up into ranges. And can we have the dropdowns be text sensitive, so
> people can just type and not have to scroll a lot?

## What was decided

- **The "unverified" warning can't be removed.** Google shows it for every
  script someone writes for their own sheet. Removing it takes Google's
  verification of a published app, and here every nursery pastes its own
  copy. So the warning is **explained before they meet it**: a "What Google
  will show you, and why it's OK" box on Setup, plus the guide.
- **Google can't separate "edit" from "delete".** What *can* shrink is how
  much of the account the script can reach. The script now declares exactly
  two permissions in `appsscript.json`:
  `spreadsheets.currentonly` (this one sheet) and `drive.file` (only the
  files it creates itself). The permission screen changes from "all your
  Drive files" to "only the specific Google Drive files you use with this
  app".
- **Photos moved from DriveApp to the Drive API service.** DriveApp demands
  the whole-Drive permission. Other people's reports showed it failing under
  `drive.file`. The Drive API service works with it. The cost is that the
  script can no longer look at the folder holding the sheet, so the photos
  folder is made in My Drive, named after the sheet, and remembered by id.
- **Farm → Range → Location.** Range is optional per farm, and a farm can have
  both its own locations and ranges. Lists are typed as `Farm | Location` or
  `Farm | Range | Location`, pasted as two or three Excel columns, or uploaded.
  The sheet gains a Range column on both tabs.
- **Type-to-find dropdowns.** A `Pick` component replaces the selects. A list
  of 8 or more opens with a search box (any part of a word, any case, accents
  ignored; Enter takes the top match). A shorter list opens without one,
  because a keyboard over three choices is in the way.
- **Setup and Guide behind ⚙.** The top bar is the name, the waiting badge,
  the language button and ⚙.

## What went wrong on the way

- **Two class names collided with the shared stylesheet.** `base.css` (shared
  with What Works) already had `.pick` (a padded list row) and `.empty` (the
  italic "nothing yet" text). The new picker used both, so it sat padded out
  of line in italics. The probes passed, because they tested behaviour, not
  layout. The screenshot showed it. The picker's classes are now `combo-*` and
  `is-*`, and the probe checks that each picker sits right under its label at
  full width. That check was broken on purpose to prove it fails.
- **PowerShell 5.1's `Set-Content -Encoding utf8` writes a byte-order mark.**
  A mutation test done that way produced a build that didn't run, and a probe
  run that printed nothing, which is easy to misread as a pass. The
  mutations were redone with node.
- **A file tool turned `̀-ͯ` into the real invisible accent
  characters.** It still worked, but invisible characters in a regex are a
  trap, so it was written back as escapes.
- **The live-site probe can't use the local stand-in sheet.** Chrome blocks a
  public website from calling `localhost`. The gate is the same build probed
  locally, and the real Google test is a person.

## Checks

Script tests 49, including "Code.gs never uses DriveApp, never opens another
spreadsheet, never deletes a file, row or sheet", and the exact two
permissions in `appsscript.json`. List tests 25. The phone walk-through has
60 checks on the built site. Each new area was broken on purpose and caught.

## Still to prove, with a real Google account

That `drive.file` + the Drive API service really saves photos, and that the
permission screen shows only the two narrow lines. If Google asks for "all
your Drive files", the settings file wasn't saved.
