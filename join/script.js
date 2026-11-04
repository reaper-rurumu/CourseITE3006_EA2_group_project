// @ts-check
(function () {
  "use strict";

  // Fixed activity names stop unknown URL values or edited options from entering our result.
  /** @typedef {"cleanup" | "planting" | "workshop" | "exploring"} ActivityId */
  /** @typedef {{name: string, email: string, activity: ActivityId, message: string}} Application */
  /** @type {Readonly<Record<ActivityId, string>>} */
  const activityNames = {
    cleanup: "A cleaner coastline",
    planting: "Room to grow",
    workshop: "Waste less. Live more.",
    exploring: "I'm still exploring"
  };

  // Each element is checked at runtime before we read properties such as value or checked.
  const form = document.getElementById("join-form");
  const nameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const activityInput = document.getElementById("activity");
  const messageInput = document.getElementById("message");
  const acknowledgement = document.getElementById("acknowledgement");
  const submitButton = document.getElementById("submit-application");
  const confirmation = document.getElementById("confirmation");
  const messageCount = document.getElementById("message-count");
  const resultName = document.getElementById("result-name");
  const resultEmail = document.getElementById("result-email");
  const resultActivity = document.getElementById("result-activity");
  const resultMessage = document.getElementById("result-message");
  if (!(form instanceof HTMLFormElement) || !(nameInput instanceof HTMLInputElement) ||
    !(emailInput instanceof HTMLInputElement) || !(activityInput instanceof HTMLSelectElement) ||
    !(messageInput instanceof HTMLTextAreaElement) || !(acknowledgement instanceof HTMLInputElement) ||
    !(submitButton instanceof HTMLButtonElement) || !(confirmation instanceof HTMLElement) ||
    !(messageCount instanceof HTMLElement) || !(resultName instanceof HTMLElement) ||
    !(resultEmail instanceof HTMLElement) || !(resultActivity instanceof HTMLElement) ||
    !(resultMessage instanceof HTMLElement)) return;

  /** @param {string} value @returns {value is ActivityId} */
  function isActivityId(value) {
    return Object.prototype.hasOwnProperty.call(activityNames, value);
  }

  // Activity links can preselect a real choice; an unknown URL value is simply ignored.
  const requestedActivity = new URLSearchParams(window.location.search).get("activity");
  if (requestedActivity !== null && isActivityId(requestedActivity)) {
    activityInput.value = requestedActivity;
  }

  /** @type {ReadonlyArray<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} */
  const fields = [nameInput, emailInput, activityInput, messageInput, acknowledgement];

  // Reset old custom errors before checking, so fixing one field always allows another attempt.
  /** @returns {boolean} */
  const validate = function () {
    fields.forEach(function (field) { field.setCustomValidity(""); });
    nameInput.value = nameInput.value.trim();
    emailInput.value = emailInput.value.trim();
    const nameLength = nameInput.value.length;
    if (nameLength < 2 || nameLength > 80) {
      nameInput.setCustomValidity("Please enter a name between 2 and 80 characters, excluding spaces at the ends.");
    }
    if (emailInput.value.length > 254) emailInput.setCustomValidity("Please use an email address of 254 characters or fewer.");
    if (!isActivityId(activityInput.value)) activityInput.setCustomValidity("Please choose one of the listed activities.");
    if (messageInput.value.length > 500) messageInput.setCustomValidity("Please keep your message within 500 characters.");
    if (!acknowledgement.checked) acknowledgement.setCustomValidity("Please acknowledge that this form is a local demonstration.");

    // Native validity checks still handle required inputs and email formatting.
    fields.forEach(function (field) {
      const error = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", String(!field.validity.valid));
      if (error instanceof HTMLElement) error.textContent = field.validationMessage;
    });
    return form.checkValidity();
  };

  // A dedicated output area renders text, never user-provided HTML.
  /** @param {Application} application */
  const showConfirmation = function (application) {
    resultName.textContent = "Thanks for taking the first step, " + application.name + "!";
    resultEmail.textContent = application.email;
    resultActivity.textContent = activityNames[application.activity];
    resultMessage.textContent = application.message || "No message added.";
    confirmation.hidden = false;
    confirmation.focus();
  };

  fields.forEach(function (field) {
    // Clear stale feedback as the user edits; a later submit checks the complete form again.
    field.addEventListener("input", function () {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
      const error = document.getElementById(field.id + "-error");
      if (error instanceof HTMLElement) error.textContent = "";
      confirmation.hidden = true;
    });
  });
  messageInput.addEventListener("input", function () {
    messageCount.textContent = messageInput.value.length + " / 500 characters";
  });

  form.addEventListener("submit", function (event) {
    // This demo never navigates, sends a request, or saves personal details to browser storage.
    event.preventDefault();
    confirmation.hidden = true;
    if (!validate()) {
      const firstInvalid = fields.find(function (field) { return !field.validity.valid; });
      if (firstInvalid) firstInvalid.focus();
      form.reportValidity();
      return;
    }
    const selectedActivity = activityInput.value;
    if (!isActivityId(selectedActivity)) return;
    showConfirmation({ name: nameInput.value, email: emailInput.value, activity: selectedActivity, message: messageInput.value.trim() });
  });

  form.addEventListener("reset", function () {
    fields.forEach(function (field) {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
      const error = document.getElementById(field.id + "-error");
      if (error instanceof HTMLElement) error.textContent = "";
    });
    confirmation.hidden = true;
    // Clear the output too, so Reset really removes the visible personal details.
    [resultName, resultEmail, resultActivity, resultMessage].forEach(function (output) { output.textContent = ""; });
    messageCount.textContent = "0 / 500 characters";
  });

  // Turn off automatic pre-submit validation only once our accessible handler is attached.
  // reportValidity() above still shows the browser's helpful native error messages.
  form.noValidate = true;
  submitButton.disabled = false;
})();
