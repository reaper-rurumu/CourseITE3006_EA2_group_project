# GreenSteps Environmental Protection Club

A three-page English website made with HTML, CSS, Bootstrap 5.3.8, and plain JavaScript.

## Open the website

Extract the complete ZIP, then double-click **index.html** in the greensteps folder. Keep the folders together so relative links work. No server, installation, account, or build step is needed. Use a current Chrome, Edge, Firefox, or Safari browser. Images, styles, and scripts work offline; outside resource links need an internet connection.

## Folder structure

```text
greensteps/
  index.html              Home page
  style.css               Shared theme and homepage styles
  script.js               Navigation, activity filters, and joining-form logic
  activities/
    index.html            Activity descriptions and filter controls
    style.css             Activity-specific styles
  join/
    index.html            Demo joining form and confirmation
    style.css             Form and confirmation styles
  assets/
    images/               Local photographs and original SVG illustrations
    vendor/               Bootstrap CSS, JS bundle, and original licence
  jsconfig.json           Strict checking settings for our JavaScript
  package.json            Optional development commands
  CREDITS.md              Asset and library sources
  VERIFICATION.md         Checks completed during development
```

## How the code stays simple

Each page has its own HTML and CSS. All three pages load the same root `script.js` once. It contains three simple setup functions: navigation, activity filters, and the joining form. Each function checks for its elements and returns safely when the current page does not need it. The root stylesheet provides the common design, and page styles load afterwards. Each page includes its navigation directly, so HTML fragments and a local server are unnecessary. Bootstrap handles mobile menu toggling; our script adds Escape-key support.

Every authored HTML, CSS, JavaScript, and SVG code line has a plain-English explanation. Complete HTML tags are kept on one line so comments do not break attributes. Empty textareas stay empty, and comments are kept outside the raw title text. File-import lines do not need explanations, and third-party Bootstrap files are kept unchanged. The checker configuration supports comments directly. `package.json` must stay valid JSON, so its line-by-line explanations appear below instead.

The activities page filters existing cards rather than creating HTML strings. The joining page combines HTML5 constraints with JavaScript checks and renders a summary using `textContent`. Names can use non-English characters. Known activity IDs are checked before use, including activity values passed in links.

## Important demonstration details

GreenSteps is fictional. Sample activities are ideas, not scheduled events. The form does not send applications, send email, create memberships, or save data to browser storage. Use example details when testing. Reset clears the input fields and displayed summary. Reloading restores the page without a saved application; your browser's own autofill settings may suggest previously entered values.

## Optional developer checks

Opening the website does not require Node or npm. To run the development checks, install Node.js and npm, open a terminal in this folder, and run:

```text
npm install
npm run typecheck
npm run check:syntax
```

The checker validates JavaScript using JSDoc types, strict null checks, DOM types, and `// @ts-check`. This is checked JavaScript, not a separate TypeScript application. Runtime element and value checks still protect browser interactions. The pinned checker version is compatible with the older Node environment used for initial verification. Vendor code is excluded from our type check.

## Editing the site

Change shared colours in the `:root` block of the root stylesheet. Edit each page's content in its own HTML file. If you add an activity, update its card, filter category, joining-form option, and the checked activity list in the root script. The filter result total is calculated from the actual number of activity cards.

The footer links to independent environmental organizations for further reading; no affiliation is claimed. See CREDITS.md for image sources and Bootstrap's licence.

## package.json explained line by line

JSON does not allow comments. Adding them to the real package file would stop npm from reading it. This annotated copy explains the same settings; the real file stays valid JSON.

```jsonc
// Start the project information object.
{
  // Give this project a simple package name.
  "name": "greensteps-club",
  // Record the current project version.
  "version": "1.0.0",
  // Prevent accidental publication as an npm package.
  "private": true,
  // Describe what this local website demonstrates.
  "description": "A buildless three-page environmental club demonstration website.",
  // Group the optional commands used during development.
  "scripts": {
    // Check the shared script using the settings in jsconfig.json.
    "typecheck": "tsc --project jsconfig.json",
    // Check the JavaScript syntax without running the website.
    "check:syntax": "node --check script.js"
  // Finish the development commands.
  },
  // List tools needed only for development, not for opening the website.
  "devDependencies": {
    // Pin the type checker version so the checks remain repeatable.
    "typescript": "4.2.4"
  // Finish the development tool list.
  }
// Finish the project information object.
}
```
