let ageCalculator = document.getElementById('ageCalculator'),
    bmiCalculator = document.getElementById('bmiCalculator'),
    ageCalcTab = document.getElementById('ageCalcTab'),
    ageOverlay = document.getElementById('ageOverlay'),
    bmiCalcTab = document.getElementById('bmiCalcTab'),
    bmiOverlay = document.getElementById('bmiOverlay'),
    calcBtn = document.getElementById("calcBtn"),
    resetBtn = document.getElementById("recalBtn"),
    bmiCalcBtn = document.getElementById("bmiCalcBtn"),
    bmiRecalBtn = document.getElementById("bmiRecalBtn"),
    ageForm = document.getElementById("ageForm"),
    bmiForm = document.getElementById("bmiForm"),
    ageResult = document.getElementById("ageResult"),
    bmiResult = document.getElementById("bmiResult"),
    dobElem = document.getElementById('dob'),
    todayElem = document.getElementById('today'),
    yearValue = document.getElementById("yearValue"),
    monthValue = document.getElementById("monthValue"),
    dayValue = document.getElementById("dayValue"),
    nextBirthdayMonthValue = document.getElementById("nextBirthdayMonth"),
    nextBirthdayDaysValue = document.getElementById("nextBirthdayDays"),
    nextBirthdayDayNameValue = document.getElementById("nextBirthdayDayName"),
    weightElem = document.getElementById('weight'),
    heightFeetElem = document.getElementById('feet'),
    heightInchesElem = document.getElementById('inches'),
    bmiValue = document.getElementById('bmiValue'),
    bmiRangeVal = document.getElementById('bmiRange');

    
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

function vanishAgeCalc(){
    ageCalculator.style.display = 'none';
    bmiCalculator.style.display = 'block';
    bmiOverlay.style.width = "100%";
    ageOverlay.style.width = "0";
    console.log('hosse');
}
function vanishBmiCalc(){
    ageCalculator.style.display = 'block';
    bmiCalculator.style.display = 'none';
    bmiOverlay.style.width = "0";
    ageOverlay.style.width = "100%";
    console.log('hosse');
}
function calculateAge(dob, today) {
    let dateOfBirth = new Date(dob),
        CurrentDate = new Date(today);

    let year = CurrentDate.getFullYear() - dateOfBirth.getFullYear();
    let month = CurrentDate.getMonth() - dateOfBirth.getMonth();
    let day = CurrentDate.getDate() - dateOfBirth.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
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
    let totalDaysLeft= Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let monthLeft= Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30 ));
    let dayLeft = Math.floor(totalDaysLeft - (monthLeft * 30));


    let dayNameArr = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    let nextBirthdayDay = Math.floor(thisYearBirthday.getDay());
    let nextBirthdayDayName = dayNameArr[nextBirthdayDay];




    return {dayLeft, monthLeft, nextBirthdayDayName};
}

function showAcResult() {
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
    nextBirthdayDayNameValue.innerHTML = nextBirthday.nextBirthdayDayName;
}

function bmiCalc(weight, feetHeight, inchesHeight){
       let bodyWeight = parseFloat(weight);
       let bodyHeightFtToMet = parseFloat(parseFloat(feetHeight) * 0.3048);
       let bodyHeightInToMet = parseFloat(parseFloat(inchesHeight) *  0.0254);
       let heightMeter = parseFloat(bodyHeightFtToMet + bodyHeightInToMet);
       let bmi = parseFloat(bodyWeight / (heightMeter ** 2));
       let bmiRounded = Math.round(bmi * 10) / 10;
       let bmiRange = "";
       if (bmiRounded < 18.5){
           bmiRange = "Underweight";
       }else if (bmiRounded <= 18.5 || bmiRounded < 25.0){
           bmiRange = "Healthy";
       }
       else if (bmiRounded <= 25.0 || bmiRounded < 30){
           bmiRange = "Overweight";
       }
       else if (bmiRounded > 30){
           bmiRange = "Obese";
       }
    console.log(bmiRange);
       return {bmiRounded, bmiRange};
}
function showBmiResult() {
        let weight = weightElem.value;
        let feetHeight = heightFeetElem.value;
        let inchesHeight = heightInchesElem.value;
        let bmiRes = bmiCalc(weight, feetHeight, inchesHeight);
        bmiForm.style.display = "none";
        bmiResult.style.display = "Block";
        bmiValue.innerHTML = bmiRes.bmiRounded;
        bmiRangeVal.innerHTML = bmiRes.bmiRange;

}
function resetAll() {
    ageForm.style.display = 'block';
    ageResult.style.display = 'none';

    yearValue.innerHTML = '';
    monthValue.innerHTML = '';
    dayValue.innerHTML = '';
    nextBirthdayMonthValue.innerHTML = '';
    nextBirthdayDaysValue.innerHTML = '';
    nextBirthdayDayNameValue.innerHTML = '';
}
function resetBmi() {
    bmiForm.style.display = "block";
    bmiResult.style.display = "none";
    bmiValue.innerHTML = '';
    bmiRangeVal.innerHTML = '';
}

ageCalcTab.addEventListener('click',vanishBmiCalc);
bmiCalcTab.addEventListener('click',vanishAgeCalc);
calcBtn.addEventListener('click', showAcResult);
resetBtn.addEventListener('click', resetAll);
bmiCalcBtn.addEventListener('click', showBmiResult);
bmiRecalBtn.addEventListener('click', resetBmi);
bmiRecalBtn.addEventListener('click', resetBmi);

window.onload = (initDatePicker);
