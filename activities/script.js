// @ts-check
(function () {
  "use strict";

  // A small fixed set of categories catches spelling mistakes during type checking.
  /** @typedef {"all" | "conservation" | "biodiversity" | "everyday"} ActivityCategory */
  /** @type {ReadonlyArray<ActivityCategory>} */
  const categories = ["all", "conservation", "biodiversity", "everyday"];
  const controls = document.querySelectorAll("[data-filter]");
  const activities = document.querySelectorAll("[data-activity]");
  const status = document.getElementById("filter-status");

  // Return a checked category instead of trusting arbitrary strings from HTML.
  /** @param {string | undefined} value @returns {value is ActivityCategory} */
  function isCategory(value) {
    return categories.some(function (category) { return category === value; });
  }

  // Filter existing cards rather than rebuilding HTML, keeping links and focus stable.
  /** @param {ActivityCategory} category */
  function filterActivities(category) {
    let visibleCount = 0;
    activities.forEach(function (activity) {
      if (!(activity instanceof HTMLElement)) return;
      const matches = category === "all" || activity.dataset.category === category;
      activity.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    controls.forEach(function (control) {
      if (!(control instanceof HTMLButtonElement)) return;
      control.setAttribute("aria-pressed", String(control.dataset.filter === category));
    });
    // Screen readers announce the new count without moving the user's keyboard focus.
    if (status instanceof HTMLElement) {
      status.textContent = "Showing " + visibleCount + " of 3 activities.";
    }
  }

  controls.forEach(function (control) {
    if (!(control instanceof HTMLButtonElement)) return;
    control.addEventListener("click", function () {
      const category = control.dataset.filter;
      if (isCategory(category)) filterActivities(category);
    });
    // Controls start disabled in HTML, so failed scripts cannot leave misleading buttons.
    control.disabled = false;
  });
})();
