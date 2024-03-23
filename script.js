document.getElementById('dateForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  const dateInput = document.getElementById('dateInput');
  // Remove spaces from the input
  const userInput = dateInput.value.replace(/\s+/g, '');
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(\d{4})$/;

  if (!dateRegex.test(userInput)) {
      // Mark the input form with a red border
      dateInput.style.borderColor = "red";
      return;
  } else {
      // Reset border color if input is valid
      dateInput.style.borderColor = "#ccc";
  }

  const inputDate = new Date(userInput.split('.').reverse().join('-') + "T00:00:00");
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to start of day

  const diffTime = Math.abs(currentDate - inputDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  document.getElementById('exclusiveOutput').textContent = "Days difference exclusive: " + diffDays;
  document.getElementById('inclusiveOutput').textContent= "Days difference inclusive: " + (diffDays + 1)
});
