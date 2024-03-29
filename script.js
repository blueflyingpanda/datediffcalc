document.getElementById('dateInput').addEventListener('input', function(e) {
  let input = e.target.value;
  const originalLength = input.length;
  const cursorPosition = e.target.selectionStart;

  // Remove any characters that are not digits or dots
  input = input.replace(/[^0-9.]/g, '');

  // Automatically insert dots after dd and mm components if not present
  if (input.length > 2 && input[2] !== '.') {
      input = input.slice(0, 2) + '.' + input.slice(2);
  }
  if (input.length > 5 && input[5] !== '.') {
      input = input.slice(0, 5) + '.' + input.slice(5);
  }

  // Ensure the final string does not exceed the length for dd.mm.yyyy
  input = input.slice(0, 10);

  // Calculate new cursor position
  let newPosition = cursorPosition;
  if (originalLength < input.length && (cursorPosition === 3 || cursorPosition === 6)) {
      newPosition = cursorPosition + 1; // Move cursor right to account for the newly inserted dot
  }

  // Update the input field
  e.target.value = input;
  e.target.setSelectionRange(newPosition, newPosition);
});


function calculate() {
  const dateInput = document.getElementById('dateInput');
  // Remove spaces from the input
  const userInput = dateInput.value.replace(/\s+/g, '');
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(\d{4})$/;

  if (!dateRegex.test(userInput)) {
      // Mark the input form with a red border for invalid format
      dateInput.style.borderColor = "red";
      return;
  } else {
      // Check if the date actually exists (e.g., 29.02 on a non-leap year)
      const parts = userInput.split(".");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
      const year = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
          // Mark the input form with a red border for non-existent date
          dateInput.style.borderColor = "red";
          return;
      } else {
          // Reset border color if input is valid
          dateInput.style.borderColor = "#ccc";
      }
  }

  const inputDate = new Date(userInput.split('.').reverse().join('-') + "T00:00:00");
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to start of day

  // Check if the "Count only working days" toggle is checked
  const countWorkingDays = document.getElementById('workingDaysToggle').checked;

  let diffDays = 0;
  let tempDate = new Date(inputDate);
  while (tempDate < currentDate) {
      if (countWorkingDays) {
          const dayOfWeek = tempDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 is Sunday, 6 is Saturday
              diffDays++;
          }
      } else {
          diffDays++; // Count all days if the toggle is not checked
      }
      tempDate.setDate(tempDate.getDate() + 1);
  }

  document.getElementById('exclusiveOutput').textContent = "Days difference exclusive: " + diffDays;
  document.getElementById('inclusiveOutput').textContent= "Days difference inclusive: " + (diffDays + 1)

  if (document.getElementById('clipboardToggle').checked) {
  navigator.clipboard.writeText(diffDays + 1)
    .then(() => {
      console.log('Result copied to clipboard successfully!');
    })
    .catch(err => {
      console.error('Failed to copy the result to clipboard: ', err);
    });
  }
};
