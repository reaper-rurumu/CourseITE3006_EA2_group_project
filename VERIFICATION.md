# Verification record

Checked on 4 November 2026.

## Completed checks

- Strict JavaScript type checking passed using TypeScript 4.2.4 and `jsconfig.json`.
- Node syntax checks passed for the single authored root JavaScript file.
- Static checks passed for **79 local references**, including linked files and fragment anchors. The three HTML pages also passed checks for duplicate IDs and missing label/ARIA references.
- **105 automated checks passed in headless Chrome 156** while loading the local files directly after the script merge and line-by-line commenting changes.
- All three pages were checked in 375px, 768px, and 1440px browser frames: no horizontal overflow, images loaded, CSS loaded, semantic content present, and current-page navigation marked.
- Mobile menus opened, closed with Escape, and returned focus to their toggles.
- Every category filter showed the expected cards, button state, and accessible result count.
- Form checks covered empty input, whitespace-only names, malformed email, missing acknowledgement, unknown activities, overlong programmatic input, Unicode names, trimming, URL preselection, safe text rendering, repeated submission, focus, reset, and opening a fresh page.
- The homepage desktop screenshot was visually reviewed. Reduced-motion CSS disables animation and transitions and uses normal scrolling.
- Every page loaded exactly one authored script. Tab titles stayed free of comment text, and the empty message field stayed empty after the HTML was reformatted for line-by-line comments.
- Authored HTML, CSS, JavaScript, SVG, and checker-configuration lines were checked for explanatory comments. Import lines and third-party Bootstrap files were excluded. The valid JSON package file is explained line by line in README.md.

## Practical limits

This is a static local demonstration, so no server or real application delivery was tested or implemented. Browser automation checks accessibility-related behaviour but is not a full screen-reader audit. The completed browser interaction suite ran in Chrome; other browser engines were not tested.

## Recheck after editing

Run the optional commands in README.md. Open each page at narrow and wide widths, follow the links, try every category filter, submit invalid and valid example data, and confirm Reset clears both the fields and the result.
