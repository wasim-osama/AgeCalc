// Get DOM elements
let calcBtn = document.getElementById("calcBtn"),
    recalBtn = document.getElementById("recalBtn"),
    dobElem = document.getElementById("dob"),
    todayElem = document.getElementById("today"),
    ageForm = document.getElementById("ageForm"),
    ageResult = document.getElementById("ageResult"),
    yearValue = document.getElementById("yearValue"),
    monthValue = document.getElementById("monthValue"),
    dayValue = document.getElementById("dayValue"),
    nextBirthdayDays = document.getElementById("nextBirthdayDays"),
    nextBirthdayHours = document.getElementById("nextBirthdayHours"),
    nextBirthdayDayName = document.getElementById("nextBirthdayDayName");

// Initialize the date picker using flatpickr library
function initDatePicker() {
    flatpickr("#dob", {
        altInput: true,
        altFormat: "F j, Y",
        disableMobile: true
    });

    flatpickr("#today", {
        altInput: true,
        altFormat: "F j, Y",
        defaultDate: new Date(),
        disableMobile: true
    });
}

// Validate date of birth input
function dobDateValidation(dob, today) {
    if (dob === "") {
        Swal.fire({
            title: "Missing Date of Birth",
            text: "Please provide a valid date of birth. The date of birth field cannot be left empty. Ensure that you enter a valid date representing your birthdate before proceeding. If you encounter any difficulties, double-check the format and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        })
        return false;
    } else if (dob > today) {
        Swal.fire({
            title: "Invalid Date of Birth",
            text: "The provided date of birth must be earlier than the current date. Please ensure that the date of birth you entered is accurate and represents a date in the past. If you continue to experience issues, double-check the format and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        })
        return false;
    } else {
        return true;
    }
}

// Calculate age based on the provided date of birth and current date
function calculateAge(dob, today) {
    // Convert date of birth and current date strings to Date objects
    let dateOfBirth = new Date(dob);
    let currentDate = new Date(today);

    // Calculate the difference in years, months, and days
    let years = currentDate.getFullYear() - dateOfBirth.getFullYear();
    let months = currentDate.getMonth() - dateOfBirth.getMonth();
    let days = currentDate.getDate() - dateOfBirth.getDate();

    // Adjust years and months if the birth month or day hasn't occurred yet
    if (months < 0 || (months === 0 && days < 0)) {
        years--;    // Subtract 1 year if the birth month or day hasn't occurred yet
        months += 12;   // Adjust the month to be positive
    }

    // Adjust days if the birthday hasn't occurred yet this month
    if (days < 0) {
        // Calculate the number of days in the last month
        const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        // Adjust the days and subtract 1 month
        days += lastMonthDays;
        months--;
    }

    // Return an object containing the calculated years, months, and days
    return { years, months, days };
}

// Calculate days, hours, and day name until the next birthday
function calculateNextBirthDay(dob, today) {
    let dateOfBirth = new Date(dob);
    let currentDate = new Date(today);

    let thisYearBirthDay = new Date((new Date()).getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
    console.log(thisYearBirthDay);
    let nextBirthDay = thisYearBirthDay;
    let nextYearBirthDay = new Date((new Date()).getFullYear() + 1, dateOfBirth.getMonth(), dateOfBirth.getDate());
    if (currentDate > nextBirthDay) {
        nextBirthDay = nextYearBirthDay
    }

    let weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let nextBirthdayWeekName = weekNames[nextBirthDay.getDay()];
    const timeDifference = nextBirthDay - currentDate;
    const leftDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const leftHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { dayName: nextBirthdayWeekName, leftDays, leftHours }
}

// Initialize the Age Calculator
function initAgeCalculator() {
    let dob = dobElem.value;
    let today = todayElem.value;

    // Validate date of birth
    if (!dobDateValidation(dob, today)) {
        return;
    }

    // Calculate age and next birthday
    let Age = calculateAge(dob, today);
    let NextBirthDay  = calculateNextBirthDay(dob, today);

    // Show the result section and hide the form
    ageForm.style.display = 'none';
    ageResult.style.display = 'block';

    // Display the calculated values
    yearValue.innerHTML = Age.years;
    monthValue.innerHTML = Age.months;
    dayValue.innerHTML = Age.days;
    nextBirthdayDays.innerHTML = NextBirthDay.leftDays;
    nextBirthdayHours.innerHTML = NextBirthDay.leftHours;
    nextBirthdayDayName.innerHTML = NextBirthDay.dayName;
}

// Reset the Age Calculator to show the form
function resetAgeCalculator() {
    ageForm.style.display = 'block';
    ageResult.style.display = 'none';

    // Clear the displayed values
    yearValue.innerHTML = '';
    monthValue.innerHTML = '';
    dayValue.innerHTML = '';
    nextBirthdayDays.innerHTML = '';
    nextBirthdayHours.innerHTML = '';
    nextBirthdayDayName.innerHTML = '';
}

// Attach event listeners to Calculate and Recalculate buttons
calcBtn.addEventListener("click", initAgeCalculator);
recalBtn.addEventListener('click', resetAgeCalculator);

// Execute the date picker initialization on window load
window.onload = () =>  {
    initDatePicker();
}
