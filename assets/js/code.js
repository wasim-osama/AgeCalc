let calcBtn = document.getElementById("calcBtn"),
    ageForm = document.getElementById("ageForm"),
    dobElem = document.getElementById('dob'),
    todayElem = document.getElementById('today'),
    ageResult = document.getElementById("ageResult"),
    yearValue = document.getElementById("yearValue"),
    monthValue = document.getElementById("monthValue"),
    dayValue = document.getElementById("dayValue"),
    nextBirthdayMonthValue = document.getElementById("nextBirthdayMonth"),
    nextBirthdayDaysValue = document.getElementById("nextBirthdayDays"),
    nextBirthdayDayName = document.getElementById("nextBirthdayDayName");


function initDatePicker() {
    flatpickr('#dob', {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
    flatpickr('#today', {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        defaultDate: "today"
    });
}

function dateValidate(dob, today) {
    if (dob > today) {
        Swal.fire({
            title: "Are you sure?",
            text: "The current date cannot precede the date of birth. Please ensure that the provided date of birth is accurate and corresponds to a date in the past.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        });
        return false;
    }
    if (dob === "") {
        Swal.fire({
            title: "Are you sure?",
            text: "Date of birth must be provided.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        });
        return false;
    } else {
        return true;
    }
}

function calculateAge(dob, today) {
    let dateOfBirth = new Date(dob),
        CurrentDate = new Date(today);

    let year = CurrentDate.getFullYear() - dateOfBirth.getFullYear();
    let month = CurrentDate.getMonth() - dateOfBirth.getMonth();
    let day = CurrentDate.getDate() - dateOfBirth.getDate();

    if (month < 0) {
        year--;
        month += 12;
    }
    if (day < 0) {
        const lastMonthDays = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), 0).getDate();
        day += lastMonthDays;
        month--;

    }
    return {year, day, month};
}
function calculateNextYearBirthdate(dob,today){
    let dateOfBirth = new Date(dob);
    let currentDate = new Date(today);


    let thisYearBirthday = new Date( currentDate.getFullYear(),dateOfBirth.getMonth(),dateOfBirth.getDate());

    let nextYearBirthday = new Date(currentDate.getFullYear() + 1,dateOfBirth.getMonth(),dateOfBirth.getDate());


    if (thisYearBirthday < currentDate){
        thisYearBirthday = nextYearBirthday;
    }


    let timeDiff = thisYearBirthday - currentDate;
    console.log(timeDiff);
    let totalDaysLeft= Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let monthLeft= Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * 4 ));
    let dayLeft = Math.floor(totalDaysLeft % monthLeft);


    console.log(monthLeft);
    return {monthLeft, dayLeft};
}

function showResult() {
    let dob = dobElem.value;
    let today = todayElem.value;

    let age = calculateAge(dob, today);
    let nextBirthday = calculateNextYearBirthdate(dob,today);
    if (!dateValidate(dob, today)) {
        return;
    }
    ageForm.style.display = 'none';
    ageResult.style.display = 'block';

    yearValue.innerHTML = age.year;
    monthValue.innerHTML = age.month;
    dayValue.innerHTML = age.day;
    nextBirthdayMonthValue.innerHTML = nextBirthday.monthLeft;
    nextBirthdayDaysValue.innerHTML = nextBirthday.dayLeft;
}


calcBtn.addEventListener('click', showResult);

window.onload = (initDatePicker);
