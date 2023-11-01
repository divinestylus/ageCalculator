/** Global elements constants section */
const dayElementField = query('[name="day"]'),
      monthElementField = query('[name="month"]'),
      yearElementField = query('[name="year"]'),
      buttonElement = query('svg'),
      yearsElement = query('.years'),
      monthElement = query('.month'),
      daysElement = query('.days'),
      yearsElementText = query('.years-text'),
      monthsElementText = query('.months-text'),
      daysElementText = query('.days-text');

/** Global date and regex contants section */
const currentYear = new Date().getFullYear(),
      currentMonth = new Date().getMonth() +1,
      currentDay = new Date().getDate(),
      numericPattern = /^[0-9]+$/; /** Regex pattern to search for only numbers (0-9) */

/** Global birth date variables section */
let birthYear = undefined, 
    birthMonth = undefined, 
    birthDay = undefined;


/** Functions section */

/**
 * This is an IIFE function that resets the the input fields when the page loads
 */
(function reset(){
    dayElementField.value = "";
    monthElementField.value = "";
    yearElementField.value = "";
})();

/**
 * This is a utility function used to query the DOM 
 * @param {string} element - This accepts the DOM selectors
 */
function query(element){
    return document.querySelector(element);
}

/**
 * This function validates the accuracy of the day passed
 * @param {number} month - The month of the year
 * @returns {boolean}
 */
function validateDay(month){
    let dayValue = dayElementField.value;

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
        addErrorMsg(dayElementField, "This field is required");
    } else if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31){
        addErrorMsg(dayElementField, "Must be a valid day");
    } else if (!numericPattern.test(dayValue)){
        addErrorMsg(dayElementField, "Numbers only");
    } else if (thirtyMonths.includes(month) && parseInt(dayValue) > 30){
        addErrorMsg(dayElementField, "Must be a valid day");
    } else if (leapMonth.includes(month) && parseInt(dayValue) > 29){
        addErrorMsg(dayElementField, "Must be a valid day");
    } else {
        removeErrorMsg(dayElementField);
        birthDay = parseInt(dayValue);
        return true;
    }
}

/**
 * This function validates the accuracy of the month passed
 * @returns {boolean}
 */
function validateMonth(){
    let monthValue = monthElementField.value;
    
    /** 
     * Validate against empty field, characters other than numbers, and invalid months 
     * Add error messages with styling 
     */
    if (monthValue === ""){
        addErrorMsg(monthElementField, "This field is required");
    } else if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12){
        addErrorMsg(monthElementField, "Must be a valid month");
    } else if (!numericPattern.test(monthValue)){
        addErrorMsg(monthElementField, "Numbers only");
    } else {
        removeErrorMsg(monthElementField);
        birthMonth = parseInt(monthValue);
        return validateDay(parseInt(monthValue));
    }
}

/**
 * This function validates the accuracy of the year passed
 * @returns {boolean}
 */
function validateYear(){
    let yearValue = yearElementField.value;

    /** 
     * Validate against empty field, characters other than numbers, and years in the future or far past 
     * Add error messages with styling 
     */
    if (yearValue === ""){
        addErrorMsg(yearElementField, "This field is required");
    } else if (parseInt(yearValue) > currentYear){
        addErrorMsg(yearElementField, "Must be in the past");
    } else if (parseInt(yearValue) < 1900){
        addErrorMsg(yearElementField, "Year must be higher");
    } else if (!numericPattern.test(yearValue)){
        addErrorMsg(yearElementField, "Numbers only");
    } else {
        removeErrorMsg(yearElementField);
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
    let ageYear = currentYear - birthYear, 
        ageMonth = currentMonth - birthMonth,
        ageDay = currentDay - birthDay;

    /** Age calculation logic */
    if (ageDay < 0){
        let lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
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

    yearsElement.innerText = ageYear;
    monthElement.innerText = ageMonth;
    daysElement.innerText = ageDay;

    /** Validate the grammar based on the digit(s) displayed */
    if (ageYear === 1 || ageYear === 0){
        yearsElementText.innerText = "year";
    } else{
        yearsElementText.innerText = "years";
    } if (ageMonth === 1 || ageMonth === 0){
        monthsElementText.innerText = "month";
    } else{
        monthsElementText.innerText = "months";
    } if (ageDay === 1 || ageDay === 0){
        daysElementText.innerText = "day";
    } else {
        daysElementText.innerText = "days";
    }
}

/**
 * This function runs the calculation only if the day, month and year are validated
 */
function runCalculation(){
    validateMonth();
    validateYear();
    if (validateMonth() === true && validateYear() === true){
        calculateAge();
    }
}


/** Listeners section */
document.addEventListener('keyup', (event) =>{
    if (event.key === "Enter"){
        runCalculation();
    }
})

buttonElement.addEventListener('click', runCalculation);