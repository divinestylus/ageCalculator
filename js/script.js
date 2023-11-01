/** Global elements constants section */
const DAY_ELEMENT_FIELD = query('[name="day"]'),
      MONTH_ELEMENT_FIELD = query('[name="month"]'),
      YEAR_ELEMENT_FIELD = query('[name="year"]'),
      BUTTON_ELEMENT = query('svg'),
      YEARS_ELEMENT = query('.years'),
      MONTHS_ELEMENT = query('.month'),
      DAYS_ELEMENT = query('.days'),
      YEARS_ELEMENT_TEXT = query('.years-text'),
      MONTHS_ELEMENT_TEXT = query('.months-text'),
      DAYS_ELEMENT_TEXT = query('.days-text');

/** Global date and regex contants section */
const CURRENT_YEAR = new Date().getFullYear(),
      CURRENT_MONTH = new Date().getMonth() +1,
      CURRENT_DAY = new Date().getDate(),
      NUMERIC_PATTERN = /^[0-9]+$/; /** Regex pattern to search for only numbers (0-9) */

/** Global birth date variables section */
let birthYear = undefined, 
    birthMonth = undefined, 
    birthDay = undefined;


/** Functions section */

/**
 * This is an IIFE that resets the the input fields when the page loads
 */
(function resetAgeDisplay(){
    DAY_ELEMENT_FIELD.value = "";
    MONTH_ELEMENT_FIELD.value = "";
    YEAR_ELEMENT_FIELD.value = "";
    DAYS_ELEMENT.innerText = "- -";
    MONTHS_ELEMENT.innerText = "- -";
    YEARS_ELEMENT.innerText = "- -";
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
    let dayValue = DAY_ELEMENT_FIELD.value;

    /** List of months and days to test against */
    const THIRTY_MONTHS = [4, 6, 9, 11];
    const LEAP_MONTH = [2];
    
    /** 
     * Validate against empty field, characters other than numbers, and invalid days
     * Add error messages with styling 
     */
    if (dayValue === ""){
        addErrorMsg(DAY_ELEMENT_FIELD, "This field is required");
    } else if (parseInt(dayValue) < 1 || parseInt(dayValue) > 31){
        addErrorMsg(DAY_ELEMENT_FIELD, "Must be a valid day");
    } else if (!NUMERIC_PATTERN.test(dayValue)){
        addErrorMsg(DAY_ELEMENT_FIELD, "Numbers only");
    } else if (THIRTY_MONTHS.includes(month) && parseInt(dayValue) > 30){
        addErrorMsg(DAY_ELEMENT_FIELD, "Must be a valid day");
    } else if (LEAP_MONTH.includes(month) && parseInt(dayValue) > 29){
        addErrorMsg(DAY_ELEMENT_FIELD, "Must be a valid day");
    } else {
        removeErrorMsg(DAY_ELEMENT_FIELD);
        birthDay = parseInt(dayValue);
        return true;
    }
    return false;
}

/**
 * This function validates the accuracy of the month passed
 * @returns {boolean}
 */
function validateMonth(){
    let monthValue = MONTH_ELEMENT_FIELD.value;
    
    /** 
     * Validate against empty field, characters other than numbers, and invalid months 
     * Add error messages with styling 
     */
    if (monthValue === ""){
        addErrorMsg(MONTH_ELEMENT_FIELD, "This field is required");
    } else if (parseInt(monthValue) < 1 || parseInt(monthValue) > 12){
        addErrorMsg(MONTH_ELEMENT_FIELD, "Must be a valid month");
    } else if (!NUMERIC_PATTERN.test(monthValue)){
        addErrorMsg(MONTH_ELEMENT_FIELD, "Numbers only");
    } else {
        removeErrorMsg(MONTH_ELEMENT_FIELD);
        birthMonth = parseInt(monthValue);
        return validateDay(parseInt(monthValue));
    }
    return false;
}

/**
 * This function validates the accuracy of the year passed
 * @returns {boolean}
 */
function validateYear(){
    let yearValue = YEAR_ELEMENT_FIELD.value;

    /** 
     * Validate against empty field, characters other than numbers, and years in the future or far past 
     * Add error messages with styling 
     */
    if (yearValue === ""){
        addErrorMsg(YEAR_ELEMENT_FIELD, "This field is required");
    } else if (parseInt(yearValue) > CURRENT_YEAR){
        addErrorMsg(YEAR_ELEMENT_FIELD, "Must be in the past");
    } else if (parseInt(yearValue) < 1900){
        addErrorMsg(YEAR_ELEMENT_FIELD, "Year must be higher");
    } else if (!NUMERIC_PATTERN.test(yearValue)){
        addErrorMsg(YEAR_ELEMENT_FIELD, "Numbers only");
    } else {
        removeErrorMsg(YEAR_ELEMENT_FIELD);
        birthYear = parseInt(yearValue);
        return true;
    }
    return false;
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
    let ageYear = CURRENT_YEAR - birthYear, 
        ageMonth = CURRENT_MONTH - birthMonth,
        ageDay = CURRENT_DAY - birthDay;

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

    YEARS_ELEMENT.innerText = ageYear;
    MONTHS_ELEMENT.innerText = ageMonth;
    DAYS_ELEMENT.innerText = ageDay;

    /** Validate the grammar based on the digit(s) displayed */
    if (ageYear === 1 || ageYear === 0){
        YEARS_ELEMENT_TEXT.innerText = "year";
    } else{
        YEARS_ELEMENT_TEXT.innerText = "years";
    } if (ageMonth === 1 || ageMonth === 0){
        MONTHS_ELEMENT_TEXT.innerText = "month";
    } else{
        MONTHS_ELEMENT_TEXT.innerText = "months";
    } if (ageDay === 1 || ageDay === 0){
        DAYS_ELEMENT_TEXT.innerText = "day";
    } else {
        DAYS_ELEMENT_TEXT.innerText = "days";
    }
}

/**
 * This function runs the calculation only if the day, month and year are validated
 */
function runCalculation(){
    if (validateMonth() && validateYear()){
        calculateAge();
    }
}


/** Listeners section */
document.addEventListener('keyup', (event) =>{
    if (event.key === "Enter"){
        runCalculation();
    }
})

BUTTON_ELEMENT.addEventListener('click', runCalculation);