// @ts-check
// Keep shared behaviour private so it cannot overwrite another page's variables.
(function () {
  "use strict";

  const menu = document.getElementById("main-navigation");
  const toggle = document.querySelector(".navbar-toggler");

  // Stop safely if a future page does not include the shared navigation.
  if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;

  // Bootstrap owns opening and closing. Clicking its button avoids a second menu system.
  menu.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("show")) {
      toggle.click();
      toggle.focus();
    }
  });
})();
