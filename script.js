document.getElementById('dateForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
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

  let diffDays = 0;
    let tempDate = new Date(inputDate);
    while (tempDate < currentDate) {
        const dayOfWeek = tempDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 is Sunday, 6 is Saturday
            diffDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
    }

  document.getElementById('exclusiveOutput').textContent = "Days difference exclusive: " + diffDays;
  document.getElementById('inclusiveOutput').textContent= "Days difference inclusive: " + (diffDays + 1)
});
