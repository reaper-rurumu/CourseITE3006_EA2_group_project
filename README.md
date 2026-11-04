# GreenSteps Environmental Protection Club

A three-page English website made with HTML, CSS, Bootstrap 5.3.8, and plain JavaScript.

## Open the website

Extract the complete ZIP, then double-click **index.html** in the greensteps folder. Keep the folders together so relative links work. No server, installation, account, or build step is needed. Use a current Chrome, Edge, Firefox, or Safari browser. Images, styles, and scripts work offline; outside resource links need an internet connection.

## Folder structure

```text
greensteps/
  index.html              Home page
  style.css               Shared theme and homepage styles
  script.js               Shared keyboard navigation behaviour
  activities/
    index.html            Activity descriptions and filter controls
    style.css             Activity-specific styles
    script.js             Category filters and accessible result count
  join/
    index.html            Demo joining form and confirmation
    style.css             Form and confirmation styles
    script.js             Validation and safe form processing
  assets/
    images/               Local photographs and original SVG illustrations
    vendor/               Bootstrap CSS, JS bundle, and original licence
  jsconfig.json           Strict checking settings for our JavaScript
  package.json            Optional development commands
  CREDITS.md              Asset and library sources
  VERIFICATION.md         Checks completed during development
```

## How the code stays simple

Every page has its own HTML, CSS, and JavaScript. The root stylesheet provides the common design. Page styles load afterwards. Each page includes its navigation directly, so HTML fragments and a local server are unnecessary. Bootstrap handles mobile menu toggling; our shared script adds Escape-key support. Comments explain important HTML sections, CSS groups, functions, and validation rules in plain English. Third-party Bootstrap files are kept unchanged.

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

Change shared colours in the `:root` block of the root stylesheet. Edit each page's content in its own HTML file. If you add an activity, update its card, filter category, joining-form option, and the checked activity list in the joining script. The filter result total is currently three, matching the three demonstration cards.

The footer links to independent environmental organizations for further reading; no affiliation is claimed. See CREDITS.md for image sources and Bootstrap's licence.
