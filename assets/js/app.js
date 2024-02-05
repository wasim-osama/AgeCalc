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

let calcBtn = document.getElementById("calcBtn");

calcBtn.addEventListener("click",function (){
    let dob = document.getElementById("dob").value;
    let cdate = document.getElementById("today").value;

    if (dob === ""){
        Swal.fire({
            title: "Missing Date of Birth",
            text: "Please provide a valid date of birth. The date of birth field cannot be left empty. Ensure that you enter a valid date representing your birthdate before proceeding. If you encounter any difficulties, double-check the format and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        })
        return;
    }
    else if (dob > cdate){
        Swal.fire({
            title: "Invalid Date of Birth",
            text: "The provided date of birth must be earlier than the current date. Please ensure that the date of birth you entered is accurate and represents a date in the past. If you continue to experience issues, double-check the format and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        })
        return;
    }


// Assume dob and cdate are date strings in the format "YYYY-MM-DD"
    let dateOfBirth = new Date(dob);        // Convert date of birth string to a Date object
    let currentDate = new Date(cdate);      // Convert current date string to a Date object

// Calculate the difference in years, months, and days
    let years = currentDate.getFullYear() - dateOfBirth.getFullYear();
    let months = currentDate.getMonth() - dateOfBirth.getMonth();
    let days = currentDate.getDate() - dateOfBirth.getDate();
    let thisYearBirthDay = new Date((new Date()).getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
    let nextBirthDay = thisYearBirthDay;
    let nextYearBirthDay = new Date((new Date()).getFullYear()+1, dateOfBirth.getMonth(), dateOfBirth.getDate());
    if(currentDate > nextBirthDay){
        nextBirthDay = nextYearBirthDay
    }
    console.log(nextBirthDay)
    let weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let nextBirthdayWeekName = weekNames[nextBirthDay.getDay()];
    const timeDifference = nextBirthDay - currentDate;

    // Calculate the remaining days and hours
    const leftDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const leftHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));



// Check if the birth month has not occurred yet or if the birth day has not occurred yet this month
    if (months < 0 || (months === 0 && days < 0)) {
        years--;    // Subtract 1 year if the birth month or day hasn't occurred yet
        months += 12;   // Adjust the month to be positive
    }

// Check if the birth day has not occurred yet this month
    if (days < 0) {
        // Calculate the number of days in the last month
        const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        // Adjust the days and subtract 1 month
        days += lastMonthDays;
        months--;
    }

    let ageForm = document.getElementById("ageForm");
    let ageResult = document.getElementById("ageResult");

    ageForm.style.display = 'none';
    ageResult.style.display = 'block';

    let yearValue = document.getElementById("yearValue");
    let monthValue = document.getElementById("monthValue");
    let dayValue = document.getElementById("dayValue");
    let nextBirthdayDays = document.getElementById("nextBirthdayDays");
    let nextBirthdayHours = document.getElementById("nextBirthdayHours");
    let nextBirthdayDayName = document.getElementById("nextBirthdayDayName");

    yearValue.innerHTML = years;
    monthValue.innerHTML = months;
    dayValue.innerHTML = days;
    nextBirthdayDays.innerHTML = leftDays;
    nextBirthdayHours.innerHTML = leftHours;
    nextBirthdayDayName.innerHTML = nextBirthdayWeekName;


})
let recalBtn = document.getElementById("recalBtn");

recalBtn.addEventListener('click',function (){
    let ageForm = document.getElementById("ageForm");
    let ageResult = document.getElementById("ageResult");

    ageForm.style.display = 'block';
    ageResult.style.display = 'none';

    let yearValue = document.getElementById("yearValue");
    let monthValue = document.getElementById("monthValue");
    let dayValue = document.getElementById("dayValue");

    yearValue.innerHTML = "";
    monthValue.innerHTML = "";
    dayValue.innerHTML = "";
})