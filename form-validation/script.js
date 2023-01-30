//declare your variables for the text field and access DOM
const email = document.getElementById("email");
const pwd = document.getElementById("password");
const confirmPwd = document.getElementById("password2");
const nameStackie = document.getElementById("stackie1");
const form = document.querySelector("#form");

//check email is valid
const isRequired = value => value === '' ? false : true;
const checkEmail = () => {
    let valid = false;
    const emailValid = email.value.trim();
    if (!isRequired(emailValid)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(emailValid)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkUsername = () => {
    let valid = false;
    const username = nameStackie.value.trim();

    if (!isRequired(username)) {
        showError(nameStackie, 'StackUp username is required.');
    } 
    else {
        showSuccess(nameStackie);
        valid = true;
    }
    return valid;
};

//check input length for password
const isBetween = (length, min) => length < min ? false : true;
const checkPassword = () => {

    let valid = false;

    const min = 5;

    const password = pwd.value.trim();

     if (!isBetween(password.length, min)) {
        showError(pwd, `Password must be at least ${min} characters.`)
    } else {
        showSuccess(pwd);
        valid = true;
    }
    return valid;
};

//check the two passwords match
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPwd.value.trim();
    const password = pwd.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPwd, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPwd, 'Passwords do not match.');
    } else {
        showSuccess(confirmPwd);
        valid = true;
    }

    return valid;
};

//add event listener for Submit button
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
  
    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isUsernameValid = checkUsername();
});

const showError = (input, message) => {
    const formField = input.parentElement;
  
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
  
    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}
