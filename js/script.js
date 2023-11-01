/**  Global variables section **/
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


/** Functions section **/

/**
 * This function validates the accuracy of the day passed
 * @param {number} month - The month of the year
 * @returns {boolean}
 */
function validateDay(month){
    let dayValue = dayField.value;

    /** List of months and days to test against */
    const thirtyMonths = [4, 6, 9, 11];
    const leapMonth = [2];
    const leapDays = [28, 29];
    
    /** 
     * Validate against empty field, characters other than numbers, and invalid days
     * Add error messages with styling 
     * 
     */
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

/**
 * This function validates the accuracy of the month passed
 * @returns {boolean}
 */
function validateMonth(){
    let monthValue = monthField.value;
    
    /** 
     * Validate against empty field, characters other than numbers, and invalid months 
     * Add error messages with styling 
     */
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

/**
 * This function validates the accuracy of the year passed
 * @returns {boolean}
 */
function validateYear(){
    let yearValue = yearField.value;

    /** 
     * Validate against empty field, characters other than numbers, and years in the future or far past 
     * Add error messages with styling 
     */
    if (yearValue === ""){
        addErrorMsg(yearField, "This field is required");
    } else if (parseInt(yearValue) > currentYear){
        addErrorMsg(yearField, "Must be in the past");
    } else if (parseInt(yearValue) < 1900){
        addErrorMsg(yearField, "Year must be higher");
    } else if (!numericPattern.test(yearValue)){
        addErrorMsg(yearField, "Numbers only");
    } else {
        removeErrorMsg(yearField);
        birthYear = parseInt(yearValue);
        return true;
    }
}

/**
 * This function adds an error message on the page
 * @param {string} field - The input feild
 * @param {string} message - The error message
 */
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

/**
 * This function removes an error messeage from the page
 * @param {string} field - the input field
 */
function removeErrorMsg(field){
    field.classList.remove('error-border');
    field.previousElementSibling.classList.remove('error-color');
    if (field.nextElementSibling !== null){
        field.nextElementSibling.remove();
    }
}

/**
 * This function calculates the age of the user
 */
function calculateAge(){
    let ageYear, ageMonth, ageDay;
    ageYear = currentYear - birthYear;
    ageMonth = currentMonth - birthMonth;
    ageDay = currentDay - birthDay;

    /** Age calculation logic */
    if (ageDay < 0){
        var lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
        ageMonth--;
        ageDay += lastDayOfMonth;
    } if (ageMonth < 0){
        ageYear--;
        ageMonth += 12;
    }

    /** Prevent negative numbers */
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

    /** Validate the grammar based on the digit(s) displayed */
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


/** Listeners section */
button.addEventListener('click', ()=>{
    validateMonth();
    validateYear();
    if (validateMonth() === true && validateYear() === true){
        calculateAge();
    }
});