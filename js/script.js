// Global variables
const dayField = document.querySelector('[name="day"]');
const monthField = document.querySelector('[name="month"]');
const yearField = document.querySelector('[name="year"]');
const button = document.querySelector('svg');
const numericPattern = /^[0-9]+$/;
const yearsEle = document.querySelector('.years');
const monthEle = document.querySelector('.month');
const daysEle = document.querySelector('.days');

const yearsTextEle = document.querySelector('.years-text');
const monthsTextEle = document.querySelector('.months-text');
const daysTextEle = document.querySelector('.days-text');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() +1;
const currentDay = new Date().getDate();

let birthYear, birthMonth, birthDay;


// Functions
function validateDay(month){
    let dayValue = dayField.value;
    const thirtyMonths = [4, 6, 9, 11];
    const leapMonth = [2];
    const leapDays = [28, 29];
    
    // Validate empty field, day number, data type and accuracy
    if (dayValue === ""){
        addErrorMsg(dayField, "This field is required");
    } else if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31){
        addErrorMsg(dayField, "Must be a valid day");
    } else if (!numericPattern.test(dayValue)){
        addErrorMsg(dayField, "Numbers only");
    } else if (thirtyMonths.includes(month) && parseInt(dayValue) > 30){
        addErrorMsg(dayField, "Must be a valid day");
    } else if (leapMonth.includes(month) && !leapDays.includes(parseInt(dayValue))){
        addErrorMsg(dayField, "Must be a valid day");
    } else {
        removeErrorMsg(dayField);
        birthDay = parseInt(dayValue);
        return true;
    }
}

function validateMonth(){
    let monthValue = monthField.value;
    
    // Validate empty field, month number, data type and accuracy
    if (monthValue === ""){
        addErrorMsg(monthField, "This field is required");
    } else if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12){
        addErrorMsg(monthField, "Must be a valid month");
    } else if (!numericPattern.test(monthValue)){
        addErrorMsg(monthField, "Numbers only");
    } else {
        removeErrorMsg(monthField);
        birthMonth = parseInt(monthValue);
        return validateDay(parseInt(monthValue));
    }
}

function validateYear(){
    let yearValue = yearField.value;

    // Validate empty field, year data type and accuracy
    if (yearValue === ""){
        addErrorMsg(yearField, "This field is required");
    } else if (parseInt(yearValue) > currentYear){
        addErrorMsg(yearField, "Must be in the past");
    } else if (parseInt(yearValue) < 1000){
        addErrorMsg(yearField, "Year must be higher");
    } else if (!numericPattern.test(yearValue)){
        addErrorMsg(yearField, "Numbers only");
    } else {
        removeErrorMsg(yearField);
        birthYear = parseInt(yearValue);
        return true;
    }
}

// Error messages
function addErrorMsg(field, message){
    field.classList.add('error-border');
    field.previousElementSibling.classList.add('error-color');
    if (field.nextElementSibling !== null){
        field.nextElementSibling.remove();
        field.insertAdjacentHTML("afterend", `<p class="error-msg error-color"><em>${message}</em></p>`);
    } else {
        field.insertAdjacentHTML("afterend", `<p class="error-msg error-color"><em>${message}</em></p>`);
    }
}

function removeErrorMsg(field){
    field.classList.remove('error-border');
    field.previousElementSibling.classList.remove('error-color');
    if (field.nextElementSibling !== null){
        field.nextElementSibling.remove();
    }
}

function calculateAge(){
    let ageYear, ageMonth, ageDay;
    ageYear = currentYear - birthYear;
    ageMonth = currentMonth - birthMonth;
    ageDay = currentDay - birthDay;

    // Adjust for negative differences
    if (ageDay < 0){
        var lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
        ageMonth--;
        ageDay += lastDayOfMonth;
    } if (ageMonth < 0){
        ageYear--;
        ageMonth += 12;
    }

    if (ageYear < 0){
        ageYear = 0; 
    } if (ageMonth < 0){
        ageMonth = 0; 
    } if (ageDay < 0){
        ageDay = 0;
    }

    yearsEle.innerText = ageYear;
    monthEle.innerText = ageMonth;
    daysEle.innerText = ageDay;

    if (ageYear === 1 || ageYear === 0){
        yearsTextEle.innerText = "year";
    } else{
        yearsTextEle.innerText = "years";
    } if (ageMonth === 1 || ageMonth === 0){
        monthsTextEle.innerText = "month";
    } else{
        monthsTextEle.innerText = "months";
    } if (ageDay === 1 || ageDay === 0){
        daysTextEle.innerText = "day";
    } else {
        daysTextEle.innerText = "days";
    }
}


// Listeners
button.addEventListener('click', ()=>{
    validateMonth();
    validateYear();
    if (validateMonth() === true && validateYear() === true){
        calculateAge();
    }
});