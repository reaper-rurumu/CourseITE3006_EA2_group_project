// @ts-check
// All three pages use this file. Each setup function checks whether its page elements exist.
// This wrapper keeps our variables private, so they do not clash with Bootstrap or other scripts.
(function () {
  // Strict mode catches mistakes such as assigning a value to an undeclared variable.
  "use strict";

  // Add keyboard support to the Bootstrap menu on any page that has one.
  function setupNavigation() {
    // Find the menu and the button that opens it on smaller screens.
    const menu = document.getElementById("main-navigation");
    // Keep this value in a constant so later code can use it without reassigning it.
    const toggle = document.querySelector(".navbar-toggler");

    // Only use these elements after checking their real browser types.
    if (!(menu instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;

    // Listen for keys pressed inside the menu, including on its links.
    menu.addEventListener("keydown", function (event) {
      // Escape should close an open menu without affecting a menu that is already closed.
      if (event.key === "Escape" && menu.classList.contains("show")) {
        // Use Bootstrap's existing button so there is only one system controlling the menu.
        toggle.click();
        // Put keyboard focus back on the button, so the user knows where they are.
        toggle.focus();
      // Finish this function or conditional block.
      }
    // Finish this callback and attach it to the method above.
    });
  // Finish this function or conditional block.
  }

  // Set up the category filters only when the Activities page is open.
  function setupActivityFilters() {
    // These types help the checker catch misspelled categories before we open the browser.
    /** @typedef {"all" | "conservation" | "biodiversity" | "everyday"} ActivityCategory */
    /** @type {ReadonlyArray<ActivityCategory>} */
    const categories = ["all", "conservation", "biodiversity", "everyday"];

    // Collect the filter buttons, activity cards, and result-count element.
    const controls = document.querySelectorAll("[data-filter]");
    // Keep this value in a constant so later code can use it without reassigning it.
    const activities = document.querySelectorAll("[data-activity]");
    // Find the filter-status element and keep it in status for later use.
    const status = document.getElementById("filter-status");

    // Home and Join do not have filters, so they can skip the rest of this setup.
    if (controls.length === 0 || activities.length === 0 || !(status instanceof HTMLElement)) return;

    // Check a value against our category list instead of trusting text from an HTML attribute.
    /** @param {string | undefined} value @returns {value is ActivityCategory} */
    function isCategory(value) {
      // Return true when at least one known category matches the value.
      return categories.some(function (category) { return category === value; });
    // Finish this function or conditional block.
    }

    // Show matching cards and update the controls without rebuilding the page.
    /** @param {ActivityCategory} category */
    const filterActivities = function (category) {
      // Start at zero, then count each card that stays visible.
      let visibleCount = 0;
      // Check each activity card against the selected category.
      activities.forEach(function (activity) {
        // Skip an unexpected element instead of trying to use properties it may not support.
        if (!(activity instanceof HTMLElement)) return;
        // The All filter matches everything; other filters match the card's category.
        const matches = category === "all" || activity.dataset.category === category;
        // Hidden cards stay in the HTML, so their original links and content are preserved.
        activity.hidden = !matches;
        // Only visible cards contribute to the result count.
        if (matches) visibleCount += 1;
      // Finish this callback and attach it to the method above.
      });

      // Tell assistive tools which filter is selected, as well as changing its CSS appearance.
      controls.forEach(function (control) {
        // Check the element type before accessing properties that belong to that type.
        if (!(control instanceof HTMLButtonElement)) return;
        // Mark this filter as selected only when its category matches the active one.
        control.setAttribute("aria-pressed", String(control.dataset.filter === category));
      // Finish this callback and attach it to the method above.
      });
      // Use the actual card total so this message stays correct if another card is added.
      status.textContent = "Showing " + visibleCount + " of " + activities.length + " activities.";
    // Finish this function expression or object value.
    };

    // Give each real filter button its own click handler.
    controls.forEach(function (control) {
      // Check the element type before accessing properties that belong to that type.
      if (!(control instanceof HTMLButtonElement)) return;
      // Run this handler when the visitor clicks the filter button.
      control.addEventListener("click", function () {
        // Read and check the selected category before passing it to the filter function.
        const category = control.dataset.filter;
        // Only run the filter when the selected category is on the allowed list.
        if (isCategory(category)) filterActivities(category);
      // Finish this callback and attach it to the method above.
      });
      // Enable a button only after its working click handler has been attached.
      control.disabled = false;
    // Finish this callback and attach it to the method above.
    });
  // Finish this function or conditional block.
  }

  // Set up validation and confirmation only when the Join page is open.
  function setupJoinForm() {
    // Activity IDs are the short values in the form; Application describes a checked submission.
    /** @typedef {"cleanup" | "planting" | "workshop" | "exploring"} ActivityId */
    /** @typedef {{name: string, email: string, activity: ActivityId, message: string}} Application */
    /** @type {Readonly<Record<ActivityId, string>>} */
    const activityNames = {
      // Each known ID maps to the readable activity name shown in the confirmation.
      cleanup: "A cleaner coastline",
      // Map the planting ID to the name visitors recognize.
      planting: "Room to grow",
      // Map the workshop ID to the name visitors recognize.
      workshop: "Waste less. Live more.",
      // Provide a choice for visitors who have not picked an activity yet.
      exploring: "I'm still exploring"
    // Finish this function expression or object value.
    };

    // Find the form first, so other pages can leave this function straight away.
    const form = document.getElementById("join-form");
    // Check the element type before accessing properties that belong to that type.
    if (!(form instanceof HTMLFormElement)) return;

    // Get each input element by the ID used in the Join page's HTML.
    const nameInput = document.getElementById("full-name");
    // Find the email element and keep it in emailInput for later use.
    const emailInput = document.getElementById("email");
    // Find the activity element and keep it in activityInput for later use.
    const activityInput = document.getElementById("activity");
    // Find the message element and keep it in messageInput for later use.
    const messageInput = document.getElementById("message");
    // Find the acknowledgement element and keep it in acknowledgement for later use.
    const acknowledgement = document.getElementById("acknowledgement");
    // Find the submit-application element and keep it in submitButton for later use.
    const submitButton = document.getElementById("submit-application");

    // Get the output elements that show the character count and successful result.
    const confirmation = document.getElementById("confirmation");
    // Find the message-count element and keep it in messageCount for later use.
    const messageCount = document.getElementById("message-count");
    // Find the result-name element and keep it in resultName for later use.
    const resultName = document.getElementById("result-name");
    // Find the result-email element and keep it in resultEmail for later use.
    const resultEmail = document.getElementById("result-email");
    // Find the result-activity element and keep it in resultActivity for later use.
    const resultActivity = document.getElementById("result-activity");
    // Find the result-message element and keep it in resultMessage for later use.
    const resultMessage = document.getElementById("result-message");

    // Stop if the HTML is incomplete. Runtime checks also give the type checker safe element types.
    if (!(nameInput instanceof HTMLInputElement) || !(emailInput instanceof HTMLInputElement) ||
        // Also check these element types before continuing with the form setup.
        !(activityInput instanceof HTMLSelectElement) || !(messageInput instanceof HTMLTextAreaElement) ||
        // Also check these element types before continuing with the form setup.
        !(acknowledgement instanceof HTMLInputElement) || !(submitButton instanceof HTMLButtonElement) ||
        // Also check these element types before continuing with the form setup.
        !(confirmation instanceof HTMLElement) || !(messageCount instanceof HTMLElement) ||
        // Also check these element types before continuing with the form setup.
        !(resultName instanceof HTMLElement) || !(resultEmail instanceof HTMLElement) ||
        // Also check these element types before continuing with the form setup.
        !(resultActivity instanceof HTMLElement) || !(resultMessage instanceof HTMLElement)) return;

    // Only accept IDs that belong to our own list, including values passed through page links.
    /** @param {string} value @returns {value is ActivityId} */
    function isActivityId(value) {
      // hasOwnProperty avoids accidentally accepting built-in names such as __proto__.
      return Object.prototype.hasOwnProperty.call(activityNames, value);
    // Finish this function or conditional block.
    }

    // Read an optional activity from a link such as join/index.html?activity=planting.
    const requestedActivity = new URLSearchParams(window.location.search).get("activity");
    // Continue with this action only when the stated condition is true.
    if (requestedActivity !== null && isActivityId(requestedActivity)) {
      // Ignore unknown values and preselect only one of our real activities.
      activityInput.value = requestedActivity;
    // Finish this function or conditional block.
    }

    // Group the fields so shared validation and reset work can use the same small loop.
    /** @type {ReadonlyArray<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} */
    const fields = [nameInput, emailInput, activityInput, messageInput, acknowledgement];

    // Return true only when our extra rules and the browser's HTML5 rules both pass.
    /** @returns {boolean} */
    const validate = function () {
      // Old custom errors must be cleared before testing a corrected form.
      fields.forEach(function (field) { field.setCustomValidity(""); });
      // Remove accidental spaces at the start or end of names and email addresses.
      nameInput.value = nameInput.value.trim();
      // Remove spaces from the ends of the email address.
      emailInput.value = emailInput.value.trim();

      // A name needs 2 to 80 characters after trimming, so spaces alone cannot pass.
      const nameLength = nameInput.value.length;
      // Continue with this action only when the stated condition is true.
      if (nameLength < 2 || nameLength > 80) {
        // Explain the name-length rule in the field's validation feedback.
        nameInput.setCustomValidity("Please enter a name between 2 and 80 characters, excluding spaces at the ends.");
      // Finish this function or conditional block.
      }
      // Check limits in JavaScript too, because a value can be changed outside normal typing.
      if (emailInput.value.length > 254) {
        // Explain the email-length rule in the field's validation feedback.
        emailInput.setCustomValidity("Please use an email address of 254 characters or fewer.");
      // Finish this function or conditional block.
      }
      // A required selection must also be one of the choices our code understands.
      if (!isActivityId(activityInput.value)) {
        // Ask the visitor to choose one of the activities the code recognizes.
        activityInput.setCustomValidity("Please choose one of the listed activities.");
      // Finish this function or conditional block.
      }
      // The optional message may be empty, but it cannot exceed the stated limit.
      if (messageInput.value.length > 500) {
        // Explain that the optional message is longer than the limit.
        messageInput.setCustomValidity("Please keep your message within 500 characters.");
      // Finish this function or conditional block.
      }
      // The acknowledgement makes it clear that this demonstration does not register a member.
      if (!acknowledgement.checked) {
        // Explain why the demonstration acknowledgement must be checked.
        acknowledgement.setCustomValidity("Please acknowledge that this form is a local demonstration.");
      // Finish this function or conditional block.
      }

      // Give each field a readable error message and an accessible valid/invalid state.
      fields.forEach(function (field) {
        // Keep this value in a constant so later code can use it without reassigning it.
        const error = document.getElementById(field.id + "-error");
        // Expose this field's current validation state to assistive tools.
        field.setAttribute("aria-invalid", String(!field.validity.valid));
        // textContent safely shows the browser's message as plain text.
        if (error instanceof HTMLElement) error.textContent = field.validationMessage;
      // Finish this callback and attach it to the method above.
      });
      // Required fields and email formatting are still checked by the browser.
      return form.checkValidity();
    // Finish this function expression or object value.
    };

    // Show one checked application without interpreting any input as HTML.
    /** @param {Application} application */
    const showConfirmation = function (application) {
      // textContent keeps names and messages safe even if someone types HTML tags.
      resultName.textContent = "Thanks for taking the first step, " + application.name + "!";
      // Display the checked email address as plain text.
      resultEmail.textContent = application.email;
      // Display the readable label for the checked activity ID.
      resultActivity.textContent = activityNames[application.activity];
      // Use a short fallback when the optional message was left blank.
      resultMessage.textContent = application.message || "No message added.";
      // Reveal the result and move focus there so keyboard users can find it.
      confirmation.hidden = false;
      // Move keyboard focus to the new confirmation so it is easy to find.
      confirmation.focus();
    // Finish this function expression or object value.
    };

    // Clear a field's old feedback as soon as the user starts changing it.
    fields.forEach(function (field) {
      // Run this handler when the visitor changes this field.
      field.addEventListener("input", function () {
        // Clear the previous custom validation message from this field.
        field.setCustomValidity("");
        // Remove the old invalid state so the next submission can check the field again.
        field.removeAttribute("aria-invalid");
        // Keep this value in a constant so later code can use it without reassigning it.
        const error = document.getElementById(field.id + "-error");
        // Only update the error output when that HTML element exists.
        if (error instanceof HTMLElement) error.textContent = "";
        // A previous summary should not look current after its inputs have changed.
        confirmation.hidden = true;
      // Finish this callback and attach it to the method above.
      });
    // Finish this callback and attach it to the method above.
    });

    // Keep the visible message length in sync with what the user has typed.
    messageInput.addEventListener("input", function () {
      // Display the current message length beside the 500-character limit.
      messageCount.textContent = messageInput.value.length + " / 500 characters";
    // Finish this callback and attach it to the method above.
    });

    // Process submission locally; this project has no server or real membership registration.
    form.addEventListener("submit", function (event) {
      // Prevent the form from navigating away or sending details in a URL.
      event.preventDefault();
      // Hide the previous confirmation until the latest details have been checked.
      confirmation.hidden = true;

      // Show errors and stop immediately when any input fails validation.
      if (!validate()) {
        // Keep this value in a constant so later code can use it without reassigning it.
        const firstInvalid = fields.find(function (field) { return !field.validity.valid; });
        // Help the user reach the first problem instead of searching the whole form.
        if (firstInvalid) firstInvalid.focus();
        // Ask the browser to show its native explanation for an invalid field.
        form.reportValidity();
        // Stop this function here so invalid data is not processed.
        return;
      // Finish this function or conditional block.
      }

      // Recheck the activity type before building the typed confirmation data.
      const selectedActivity = activityInput.value;
      // Continue with this action only when the stated condition is true.
      if (!isActivityId(selectedActivity)) return;
      // Pass these checked details to the function that displays the result.
      showConfirmation({
        // The name and email have already been trimmed and validated above.
        name: nameInput.value,
        // Include the checked email address in the confirmation data.
        email: emailInput.value,
        // Include the activity ID after it has passed the allowed-value check.
        activity: selectedActivity,
        // Trim an optional message so a few spaces are treated as an empty message.
        message: messageInput.value.trim()
      // Finish this callback and attach it to the method above.
      });
    // Finish this callback and attach it to the method above.
    });

    // Let the browser reset input values while we clear our extra messages and output.
    form.addEventListener("reset", function () {
      // Visit each form field to clear its extra validation feedback.
      fields.forEach(function (field) {
        // Clear the previous custom validation message from this field.
        field.setCustomValidity("");
        // Remove the old invalid state so the next submission can check the field again.
        field.removeAttribute("aria-invalid");
        // Keep this value in a constant so later code can use it without reassigning it.
        const error = document.getElementById(field.id + "-error");
        // Only update the error output when that HTML element exists.
        if (error instanceof HTMLElement) error.textContent = "";
      // Finish this callback and attach it to the method above.
      });
      // Hide and clear the old summary, including any personal details it displayed.
      confirmation.hidden = true;
      // Visit each confirmation output so Reset can clear every displayed personal detail.
      [resultName, resultEmail, resultActivity, resultMessage].forEach(function (output) {
        // Remove the old personal detail from this output element.
        output.textContent = "";
      // Finish this callback and attach it to the method above.
      });
      // The browser resets the textarea, so its counter should return to zero too.
      messageCount.textContent = "0 / 500 characters";
    // Finish this callback and attach it to the method above.
    });

    // Use our submit handler first, then call native validation explicitly when needed.
    form.noValidate = true;
    // The HTML starts with submission disabled; enable it only after setup succeeds.
    submitButton.disabled = false;
  // Finish this function or conditional block.
  }

  // Each setup function runs independently, so a missing form never stops the other features.
  setupNavigation();
  // Start the activity filters when the matching page elements are present.
  setupActivityFilters();
  // Start form handling when the matching Join page elements are present.
  setupJoinForm();
// Run the private wrapper once after defining the setup functions.
})();
