let calcBtn = document.getElementById("calcBtn"),
    ageForm = document.getElementById("ageForm"),
    ageResult = document.getElementById("ageResult"),
    yearValue = document.getElementById("yearValue"),
    monthValue = document.getElementById("monthValue"),
    dayValue = document.getElementById("dayValue")


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
calcBtn.addEventListener('click',function (){
    /*console.log(getAge());
    return;*/
    let dob = document.getElementById('dob').value;
    let today = document.getElementById('today').value;
    console.log(dob,today);

    if (dob > today){
        Swal.fire({
            title: "Are you sure?",
            text: "The current date cannot precede the date of birth. Please ensure that the provided date of birth is accurate and corresponds to a date in the past.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        });
        return;
    }
    if (dob === ""){
        Swal.fire({
            title: "Are you sure?",
            text: "Date of birth must be provided.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Okay!"
        });
        return;
    }
    ageForm.style.display = "none";
    ageResult.style.display = "block";

    let dobElem = new Date(dob);
    let todayElem = new Date(today);
    console.log(todayElem.getMonth(),dobElem.getMonth())

    let year = todayElem.getFullYear() - dobElem.getFullYear();
    let month = todayElem.getMonth() - dobElem.getMonth();
    let day = todayElem.getDate() - dobElem.getDate();
    let thisYearBirthDate = day + new Date(year,month, 0).getDate();
    let thisYearBirthMonth = month + 12;
    let thisYearBirthYear = year - 1;
    console.log(month);

    console.log(day < 0)
    if (day < 0){
        console.log(month,'day')
        month = thisYearBirthMonth - 1;

    }
    if (month < 0){
        month = thisYearBirthMonth;
        year = thisYearBirthYear - 1;
    }
    yearValue.innerHTML = year;
    monthValue.innerHTML = month;
    dayValue.innerHTML = day;
})
function getAge()
{
    let date_1 = new Date(document.getElementById('dob').value);
    let date_2 = new Date(document.getElementById('today').value);
    console.log(date_2);

//convert to UTC
    var date2_UTC = new Date(Date.UTC(date_2.getUTCFullYear(), date_2.getUTCMonth(), date_2.getUTCDate()));
    var date1_UTC = new Date(Date.UTC(date_1.getUTCFullYear(), date_1.getUTCMonth(), date_1.getUTCDate()));
    console.log(date2_UTC);


    var yAppendix, mAppendix, dAppendix;


//--------------------------------------------------------------
    var days = date2_UTC.getDate() - date1_UTC.getDate();
    if (days < 0)
    {

        date2_UTC.setMonth(date2_UTC.getMonth() - 1);
        days += DaysInMonth(date2_UTC);
    }
//--------------------------------------------------------------
    var months = date2_UTC.getMonth() - date1_UTC.getMonth();
    if (months < 0)
    {
        date2_UTC.setFullYear(date2_UTC.getFullYear() - 1);
        months += 12;
    }
//--------------------------------------------------------------
    var years = date2_UTC.getFullYear() - date1_UTC.getFullYear();




    if (years > 1) yAppendix = " years";
    else yAppendix = " year";
    if (months > 1) mAppendix = " months";
    else mAppendix = " month";
    if (days > 1) dAppendix = " days";
    else dAppendix = " day";


    return years + yAppendix + ", " + months + mAppendix + ", and " + days + dAppendix + " old.";
}


function DaysInMonth(date2_UTC)
{
    var monthStart = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth(), 1);
    var monthEnd = new Date(date2_UTC.getFullYear(), date2_UTC.getMonth() + 1, 1);
    var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    return monthLength;
}

