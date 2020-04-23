
// global variables
//name and email input variables
const nameInput = document.getElementById('name');
const userInfoFieldset = nameInput.parentElement;
const form = nameInput.parentElement.parentElement;
const emailInput = document.getElementById('mail');
//job field variables
const otherJobInput = document.getElementById('other-title');
const otherJob = otherJobInput.previousElementSibling;
const jobDropdown = document.getElementById('title');
const shirtStyleDropdown = document.getElementById('design');
const shirtColorList = document.getElementById('color');
//t-shirt field 
const cornflowerBlue = shirtColorList.firstElementChild;
const noColorDefault = document.createElement('option');
noColorDefault.value = '';
noColorDefault.setAttribute('selected', ''); 
noColorDefault.setAttribute('disabled', '');
noColorDefault.textContent = 'Please select a T-shirt theme';
shirtColorList.insertBefore(noColorDefault, cornflowerBlue);
//activities section 
const activities = document.getElementsByClassName('activities')[0];
const actReg = activities.firstElementChild; //register for activities
const activitiesList = actReg.nextElementSibling;
const actErrorMessage = document.createElement('p');
actErrorMessage.textContent = 'Please select at least 1 activity below.';
actErrorMessage.style.color = 'red';
actErrorMessage.style.display = 'none';
form.insertBefore(actErrorMessage, activities);
let totalCost = 0;
//payment section
//payment dropdown
const payInfoFieldset = activities.nextElementSibling;
const paySelectDropdown = document.getElementById('payment');
const displayAmountDiv = document.createElement('div');
displayAmountDiv.className = 'cost'; //this and the next line are actually for the cost display in the activities section
form.insertBefore(displayAmountDiv, payInfoFieldset);
//payment info section
const creditCardDiv = document.getElementById('credit-card');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const cardDiv = document.getElementById('credit-card');
const payPalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const paymentDropdown = document.getElementById('payment');
const selectMethodOpt = paymentDropdown.firstElementChild;
selectMethodOpt.setAttribute('disabled', '');
payPalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';
//register button section
const registerButton = bitcoinDiv.parentElement.nextElementSibling;
const registerPrevent = document.createElement('p');
registerPrevent.textContent = 'There appears to be 1 or more errors on this form. Please correct the areas highlighted in red before continuing.';
registerPrevent.style.color = 'red';
registerPrevent.style.display = 'none';
registerButton.parentElement.insertBefore(registerPrevent, registerButton);

//sets arrays for the shirt colors
const jsPunsColors = [];
const heartJsColors = [];

//makes the name field infocus on page load
nameInput.focus();

//makes the colors for the t-shirt selection hidden before a t-shirt theme is selected
noColorVisible();

//calls on the shirtColors() function, so that the colors are put into their groups. 
shirtColors();

//hides the other job input field by default
otherJobInput.style.display = 'none';

//function that sets styles and classes based off of validation tests for different fields.
//will add the errored attribute. This is used in the isEverythingValid function.
function isValidListener(testInput, testTarget, countNum){
    const targetNameValue = testTarget.previousElementSibling.textContent.toLowerCase();
    let errorMessage = '';
    if(testInput){
        testTarget.style.background = '';
        testTarget.style.borderColor = ''; 
        testTarget.classList.remove('errored');
    } else {
        testTarget.style.background = '#E5A3A3';
        testTarget.style.borderColor = 'red';
        testTarget.classList.add('errored');
       if(testTarget.classList.contains('spanAdded')){
            testTarget.classList.remove('errored');
            errorMessage.textContent = 'Please enter in a valid ' + targetNameValue;
       } else {
            testTarget.classList.add('spanAdded');
            testTarget.classList.remove('errored');
            errorMessage = document.createElement('span');
            errorMessage.textContent = 'Please enter in a valid ' + targetNameValue;
            testTarget.parentElement.insertBefore(errorMessage, testTarget);
       }
    }
    if(testInput && testTarget.classList.contains('spanAdded')){
        errorMessage = testTarget.previousElementSibling;
        errorMessage.style.display = 'none';
    } else if(testInput == false){
        errorMessage = testTarget.previousElementSibling;
        errorMessage.style.display = '';
        testTarget.classList.add('errored');
    } else {
    }
    if(testTarget == cardNumber && countNum){
        errorMessage.textContent = 'Hmmm, this number seems too long...It should be between 13 and 16 digits.';
        testTarget.classList.add('errored');
    } else {}
}

//function will prevent the register button from performing it's default action (reloading...submitting) if there are any errored fields.
function isEverythingValid(trigger){
    if(nameInput.classList.contains('errored') || emailInput.classList.contains('errored') || activityCounter() === 0 || cardNumber.classList.contains('errored') || zipCode.classList.contains('errored') || cvvNum.classList.contains('errored')){
        trigger.preventDefault();
        registerPrevent.style.display = ''; 
    } else {
        registerPrevent.style.display = 'none';
    }
}

//checks to see if the info in the name field is valid
function isNameEntered(name) {
    return /^[a-zA-Z]+\s?[a-zA-Z]*$/.test(name); //will test to see if there are either upper or lower case letters. Needs to be at least 1
}
//checks the info in the email field as valid
function isEmailEntered(email){
    return /\w+\@\w+\.\w+/.test(email);
}
//checks the info in the card number field as valid
function isCardNumEntered(cardNumber){
    return /^(\d{13,16})+$/.test(cardNumber);
}
//checks to see if the card number is longer tan 16 digits
function isCardNumLong(cardNumber){
    return /^(\d{17,})$/.test(cardNumber);
}
//checks to see if the zip entered is 5 numbers long
function isZipEntered(zipCode){
    return /^\d{5}$/.test(zipCode);
}
//checks to see if the cvv entered is 3 digits long
function isCvvEntered(cvvNum){
    return /^\d{3}$/.test(cvvNum);
}

//This function designates two groups for the shirt colors to go into. There is an empty else at the end, which prevent the placeholder text from being grouped
function shirtColors(){
    for(let x=0; x < shirtColorList.length; x++){
        if(shirtColorList[x].value == 'cornflowerblue' || shirtColorList[x].value == 'darkslategrey' || shirtColorList[x].value == 'gold'){
            jsPunsColors.push(shirtColorList[x]);
        } else if(shirtColorList[x].value == 'tomato' || shirtColorList[x].value == 'steelblue' || shirtColorList[x].value == 'dimgrey') {
            heartJsColors.push(shirtColorList[x]);
        } else {
            
        }          
    }
}

//function that will determine which color options are visible for the t-shirt selection
function visibleColorOptions(visible, notVisible){
    noColorDefault.textContent = 'Please select a color';
    noColorDefault.removeAttribute('selected', '');
    noColorDefault.setAttribute('selected', '');
    for(let x=0; x < visible.length; x++){
        visible[x].style.display = '';
    }  
    for(let x=0; x < notVisible.length; x++){
        notVisible[x].style.display = 'none'; 
    } 
}

//function that will make no color options visible if a t-shirt theme isn't selected
function noColorVisible(){
    noColorDefault.textContent = 'Please select a T-shirt theme';
    noColorDefault.removeAttribute('selected', '');
    noColorDefault.setAttribute('selected', '');
    for(let x=0; x < shirtColorList.length; x++){
        shirtColorList[x].style.display = 'none';
    } 
}

//function that will disabled events that have conflicting times. Will enable them again when the conflicting one is de-selected
function sameActivities(toCheck, currentTargetName, currentTarget){
    for(let a = 1; a < activities.children.length; a++){
        const currentChild = activities.children[a]; //holds the current child/event being evaluated
        const currentCheckbox = currentChild.firstElementChild; //checkbox of the label/child being looked at per the for loop
        const currentSelectionTime = toCheck[2].nodeValue.toString();
        const comparedCbTime = currentCheckbox.attributes[2].nodeValue.toString();
        const result = currentSelectionTime.localeCompare(comparedCbTime); //checks values of the time slots
        const resultSelfMatch = currentTargetName.localeCompare(currentCheckbox.attributes[1].nodeValue.toString());
        /**if there is a conflict in the time (and the result ends up being zero when those two values are compared and are found to be the same), 
         * then the checkbox that was matched (not the currently selected/clicked one) will need to be disabled....not the one that is currently clicked.
         * isSelected will happen after this function. So, when a checkbox is clicked to be selected, it will not have the selected class on it. It will
         * instead have the selected class on it when it's in the process of being de-selected. 
         * currentTarget is the one that is currently being clicked.
         * currentCheckbox is the one that is being compared to the current target.
         * currentCheckbox is the one to disable. Not currentTarget
         */
         //When the checkbox is first clicked, selected will not have been added to it yet, so this is false initially. When it's being deselected, it will be true. 
        let isSelectedAdded = false;
        if(currentTarget.classList.contains('selected')){
            isSelectedAdded = true;
        } else {
            isSelectedAdded = false;
        }
        if(result === 0 && isSelectedAdded == false){
            //compared checkbox w/ conflicting time is disabled
            currentCheckbox.classList.add('disabled');
            currentCheckbox.setAttribute('disabled', '');
            currentCheckbox.parentElement.style.color = 'grey';
            noActSelected(activityCounter);
            if(resultSelfMatch === 0){
                currentTarget.removeAttribute('disabled', '')
                currentTarget.classList.remove('disabled')
                currentCheckbox.parentElement.style.color = '';
            } else {
            }
        } else if(result === 0 && isSelectedAdded == true){
            currentCheckbox.classList.remove('disabled');
            currentCheckbox.removeAttribute('disabled', '');
            currentCheckbox.parentElement.style.color = '';
        }
    }
}

//function to count and keep track of the number of activities that have been selected
function activityCounter(){
    let numActSel = 0;
    for(let q = 1; q < activities.children.length; q++){
        const currentActChild = activities.children[q];
            if(currentActChild.firstElementChild.classList.contains('selected')){
                numActSel += 1;
            } else {
            } 
    } return numActSel;
}

//funtion that will add a selected class to the currently clicked checkboxes. Helps to determine if the checkbox is being selected or unselected
//will also call on the activity counter, to help keep track of how many events have been selected
function isSelected(currentTarget){
    if(currentTarget.classList.contains('selected')){
        currentTarget.classList.remove('selected');
    } else {
        currentTarget.classList.add('selected'); 
    }  activityCounter();
}

function noActSelected(numOfActs){
    if(numOfActs == 0){
        actReg.style.borderColor = 'red';  
        actReg.style.background = '#E5A3A3';  
        actErrorMessage.style.display = '';
    } else {
        actReg.style.borderColor = ''; 
        actReg.style.background = '';
        actErrorMessage.style.display = 'none';
    }
}

//function that pulls the amount of each event, and adds or subtracts it as needed. Calls the function to display the amount on the page. Will also show nothing if the amount is zero
function cost(currentTargetList, currentTarget){
    for(let a = 0; a < currentTargetList.length; a++){
        if(currentTargetList[a].name == 'data-cost'){
            const amount = currentTargetList[a].nodeValue;
            if(currentTarget.classList.contains('selected')){
                totalCost += parseFloat(amount);
            } else {
                totalCost -= parseFloat(amount);
            }
            if(totalCost == 0){
                displayAmountDiv.style.display = 'none';
            } else {
                displayAmountDiv.style.display = '';
            }
        }
    } 
    displayCost(totalCost);  
}

//function to show the amount of the events on the page. 
function displayCost(amount){
    document.querySelector('div.cost').innerHTML = "<h4>Total: $" + amount + "</h4>"; 
}

//This event listener will show/hide the other job input field, depending on if "other" has been selected. 
jobDropdown.addEventListener('change', (e) => {
    if(e.target.value == 'other'){
        otherJobInput.style.display = ''; 
       } else {
        otherJobInput.style.display = 'none';
    }
});

//event listener for the t-shirt theme selection 
shirtStyleDropdown.addEventListener('change', (e) => {
    if(e.target.value == 'js puns'){
        visibleColorOptions(jsPunsColors, heartJsColors);
    } else if (e.target.value == 'heart js'){
        visibleColorOptions(heartJsColors, jsPunsColors);
    } else {
        noColorVisible();
    }
});

//event listener for the checkboxes and if they're clicked. Calls 3 other functions: sameActivities, isSelected, and cost
activities.addEventListener('change', (e) => {
    const dateTime = [];
    for(let x=0; x < e.target.attributes.length; x++){ //create array to pull the attributes from
        dateTime.push(e.target.attributes[x]);
    }
    sameActivities(dateTime, dateTime[1].value, e.target); //calls on the function sameActivities, passing in the array, the 2nd slot of the array (date/time), and the current target that was clicked
    isSelected(e.target);
    cost(e.target.attributes, e.target);
});

//event listener for the payment method choice. Will hide/display the relevant info based on their selection
payInfoFieldset.addEventListener('change', (e) => {
    if(e.target.value == 'credit card' || e.target.value == 'select method'){
        //selectMethodOpt.style.display = 'none';
        creditCardDiv.style.display = '';
        payPalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if(e.target.value == 'paypal'){
        creditCardDiv.style.display = 'none';
        payPalDiv.style.display = '';
        bitcoinDiv.style.display = 'none';
    } else if(e.target.value == 'bitcoin'){ 
        creditCardDiv.style.display = 'none';
        payPalDiv.style.display = 'none';
        bitcoinDiv.style.display = '';
    } else {}
});

//event listeners for the different fields. They are set for key up and blur events, so that the validation will run on both. 
//these events will pass the target into one of the validation functions, to check on the validity of the info being entered.
nameInput.addEventListener('keyup', (e) => {
    isValidListener(isNameEntered(e.target.value), nameInput,);
});
nameInput.addEventListener('blur', (e) => {
    isValidListener(isNameEntered(e.target.value), nameInput,);
});
emailInput.addEventListener('keyup', (e) => {
    isValidListener(isEmailEntered(e.target.value), emailInput,);
});
emailInput.addEventListener('blur', (e) => {
    isValidListener(isEmailEntered(e.target.value), emailInput,);
});
cardNumber.addEventListener('keyup', (e) => {
    isValidListener(isCardNumEntered(e.target.value), cardNumber, isCardNumLong(e.target.value));
});
cardNumber.addEventListener('blur', (e) => {
    isValidListener(isCardNumEntered(e.target.value), cardNumber, );
});
zipCode.addEventListener('keyup', (e) => {
    isValidListener(isZipEntered(e.target.value), zipCode, );
});
zipCode.addEventListener('blur', (e) => {
    isValidListener(isZipEntered(e.target.value), zipCode, );
});
cvvNum.addEventListener('keyup', (e) => {
    isValidListener(isCvvEntered(e.target.value), cvvNum, );
});
cvvNum.addEventListener('blur', (e) => {
    isValidListener(isCvvEntered(e.target.value), cvvNum, );
});

//event listener for the register button. Triggers the fuctions that will check the validity of the required fields. Will also 
//run the isEverythingValid function for the field stylings. 
registerButton.addEventListener('click', (e) => {
    isValidListener(isNameEntered(nameInput.value), nameInput,);
    isValidListener(isEmailEntered(emailInput.value), emailInput,);
    noActSelected(activityCounter());
    if(paySelectDropdown.value == 'credit card' || paySelectDropdown.value == 'select method'){
        isValidListener(isCardNumEntered(cardNumber.value), cardNumber,);
        isValidListener(isZipEntered(zipCode.value), zipCode,);
        isValidListener(isCvvEntered(cvvNum.value), cvvNum,);    
    } else {        
    } 
    isEverythingValid(e);
});