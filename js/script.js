// Variables

const nameInput = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJob = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');
const activitiesReg = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let costTotal = 0;
const paymentSelect = document.getElementById('payment');
const creditcard = document.getElementById('credit-card');
const paypay = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const emailAddress = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const formSubmit = document.getElementsByTagName('form')[0];
let invalidNumber = 0;
const activitiesCheck = document.querySelectorAll("input[type='checkbox']");

// Name Field

nameInput.focus();

// Job Role

otherJob.style.display = "none";
jobRole.addEventListener('change', (e) => {
    if(e.target.value === 'other'){
        otherJob.style.display = "block";
    } else {
        otherJob.style.display = "none";
    }
})

// T-shirt info

colorSelect.disabled = true;
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    colorOptions[0].textContent = `Please select a color`;
    for(let i =0; i < colorOptions.length; i++){
        colorOptions[i].hidden = false;
    }
    for(let i = 0; i < colorOptions.length; i++){
        const designSelected = e.target.value;
        if(designSelected == colorOptions[i].getAttribute('data-theme')){
            colorOptions[i].hidden = false;
        } else {
            colorOptions[i].hidden = true;
        }
    }
})

// Register for Activities

activitiesReg.addEventListener('change', (e) => {
    if (e.target.checked === true){
        costTotal += parseInt(e.target.getAttribute('data-cost'));
        const datePicked = e.target.getAttribute('data-day-and-time');
        for (let i = 0; i < activitiesCheck.length; i++){
            activitiesDate = activitiesCheck[i].getAttribute('data-day-and-time')
            if(datePicked === activitiesDate && activitiesCheck[i] !== e.target){
                activitiesCheck[i].disabled = true
            }
        }
    } else if (e.target.checked === false){
        costTotal -= parseInt(e.target.getAttribute('data-cost'));
        const datePicked = e.target.getAttribute('data-day-and-time');
        for (let i = 0; i < activitiesCheck.length; i++){
            activitiesDate = activitiesCheck[i].getAttribute('data-day-and-time')
            if(datePicked === activitiesDate && activitiesCheck[i] !== e.target){
                activitiesCheck[i].disabled = false
            }
    } 
}   activitiesCost.innerHTML = `Total: $${costTotal}`;
})



// Payment Info

paypay.hidden = true;
bitcoin.hidden = true;
paymentSelect.children[1].setAttribute('selected', 'true');
paymentSelect.addEventListener('change', (e) => {
    creditcard.hidden = true;
    paypay.hidden = true;
    bitcoin.hidden = true;
    window[e.target.value].hidden = false;
})

// Form Validation

formSubmit.addEventListener('submit', (e) =>{
    nameValidator();
    emailValidator();
    activitiesValidator();
    if(nameValidator() == false || emailValidator() == false || activitiesValidator() == false){
        e.preventDefault()
    }
    if (paymentSelect.value === 'credit-card'){
        creditCardNumberValidator();
        zipCodeValidator();
        cVVValidator();
        if(creditCardNumberValidator() == false || zipCodeValidator() == false || cVVValidator() == false){
            e.preventDefault()
        }
    }
})

// Name Validator

const nameValidator = () =>{
    const nameValue = nameInput.value;
    if(nameValue.length == 0){
        nameInput.parentNode.classList.add('not-valid');
        nameInput.parentNode.classList.remove('valid');
        nameInput.parentNode.lastElementChild.style.display = 'block';
        return false;
    } else {
        nameInput.parentNode.classList.add('valid');
        nameInput.parentNode.classList.remove('not-valid');
        nameInput.parentNode.lastElementChild.style.display = 'none';
        return true;
    }
}

// Email Validator

const emailValidator = () =>{
    const emailValue = emailAddress.value;
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidator = regExEmail.test(emailValue);
    if(emailValidator === true){
        emailAddress.parentNode.classList.add('valid');
        emailAddress.parentNode.classList.remove('not-valid');
        emailAddress.parentNode.lastElementChild.style.display = 'none';
        return true
    } else {
        if (emailValue.length == 0) {
            emailAddress.parentNode.classList.add('not-valid');
            emailAddress.parentNode.classList.remove('valid');
            emailAddress.parentNode.lastElementChild.textContent = `Email address cannot be blank`
            emailAddress.parentNode.lastElementChild.style.display = 'block';
            return false
        } else {
            emailAddress.parentNode.classList.add('not-valid');
            emailAddress.parentNode.classList.remove('valid');
            emailAddress.parentNode.lastElementChild.textContent = `Email address must be formatted correctly`
            emailAddress.parentNode.lastElementChild.style.display = 'block';
            return false
        }
    }
}

// Activities Validator

const activitiesValidator = () =>{
    if(costTotal === 0){
        activitiesReg.classList.add('not-valid');
        activitiesReg.classList.remove('valid');
        activitiesReg.lastElementChild.style.display = 'block';
        return false
    } else {
        activitiesReg.classList.add('valid');
        activitiesReg.classList.remove('not-valid');
        activitiesReg.lastElementChild.style.display = 'none';
        return true
    }
}

// Creidt Card Validator

// Creidt Card Number Validator

const creditCardNumberValidator = () =>{
    const creditCardValue = cardNumber.value;
    const regExCreditCard = /^[0-9]{13,16}$/;
    const creditCardValidator = regExCreditCard.test(creditCardValue);
    if(creditCardValidator === false){
        cardNumber.parentNode.classList.add('not-valid');
        cardNumber.parentNode.classList.remove('valid');
        cardNumber.parentNode.lastElementChild.style.display = 'block';
        return false
    } else {
        cardNumber.parentNode.classList.add('valid');
        cardNumber.parentNode.classList.remove('not-valid');
        cardNumber.parentNode.lastElementChild.style.display = 'none';
        return true
    }
}

// Zip Code Validator

const zipCodeValidator = () => {
    const zipCodeValue = zipCode.value;
    const regExZip = /^[0-9]{5}$/;
    const zipCodeValidator = regExZip.test(zipCodeValue);
    if(zipCodeValidator === false){
        zipCode.parentNode.classList.add('not-valid');
        zipCode.parentNode.classList.remove('valid');
        zipCode.parentNode.lastElementChild.style.display = 'block';
        return false
    } else {
        zipCode.parentNode.classList.add('valid');
        zipCode.parentNode.classList.remove('not-valid');
        zipCode.parentNode.lastElementChild.style.display = 'none';
        return true
    }
}

// CVV Validator

const cVVValidator = () => {
    const cvvValue = cvv.value;
    const regExCvv = /^[0-9]{3}$/;
    const cvvValidator = regExCvv.test(cvvValue);
    if(cvvValidator === false){
        cvv.parentNode.classList.add('not-valid');
        cvv.parentNode.classList.remove('valid');
        cvv.parentNode.lastElementChild.style.display = 'block';
        return false
    } else {
        cvv.parentNode.classList.add('valid');
        cvv.parentNode.classList.remove('not-valid');
        cvv.parentNode.lastElementChild.style.display = 'none';
        return true
    }
}

// real time Validator

nameInput.addEventListener('keyup', () => {
    nameValidator()
});

emailAddress.addEventListener('keyup', () => {
    emailValidator()
});

activitiesReg.addEventListener('change', () => {
    activitiesValidator()
});

cardNumber.addEventListener('keyup', () => {
    creditCardNumberValidator()
});

zipCode.addEventListener('keyup', () => {
    zipCodeValidator()
});

cvv.addEventListener('keyup', () => {
    cVVValidator()
});



// Accessibility

for (let i = 0; i < activitiesCheck.length; i++){
    activitiesCheck[i].addEventListener('focus', () => {
        activitiesCheck[i].parentNode.classList.add('focus')
    });
    activitiesCheck[i].addEventListener('blur', () => {
        activitiesCheck[i].parentNode.classList.remove('focus')
    })
}