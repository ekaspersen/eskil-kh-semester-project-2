import { USER_SIGNUP_URL } from './settings/api';
import { validatePassword, validateEmail } from './utils/validation';

const contactForm = document.querySelector('#signUpForm');

const firstName = document.querySelector('#userName');
const firstNameError = document.querySelector('#userNameError');

const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');

const confirmPassword = document.querySelector('#confirmPassword');
const confirmPasswordError = document.querySelector('#confirmPasswordError');

const confirmPasswordErrorNotMatching = document.querySelector('#confirmPasswordErrorNotMatching');
const generalErrorMessage = document.querySelector('#general-error-message');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFirstName = false;
    if (firstName.value.trim().length > 8) {
        firstNameError.classList.add('hidden');
        isFirstName = true;
    } else {
        firstNameError.classList.remove('hidden');
    }

    let isEmail = false;
    if (email.value.trim().length > 0) {
        emailError.classList.add('hidden');
        isEmail = true;
    } else {
        emailError.classList.remove('hidden');
    }

    let isValidEmail = false;
    if (email.value.trim().length && validateEmail(email.value) === true) {
        emailErrorNotValid.classList.add('hidden');
        isValidEmail = true;
    } else if (email.value.trim().length && validateEmail(email.value) !== true) {
        emailErrorNotValid.classList.remove('hidden');
    }

    let isPassword = false;

    if (password.value.trim().length >= 8) {
        passwordError.classList.add('hidden');
        isPassword = true;
    } else {
        passwordError.classList.remove('hidden');
    }

    let isConfirmPassword = false;
    if (confirmPassword.value.trim().length >= 8) {
        confirmPasswordError.classList.add('hidden');
        isConfirmPassword = true;
    } else {
        confirmPasswordError.classList.remove('hidden');
    }

    let isValidPasswordMatch = false;
    isValidPasswordMatch = validatePassword(password.value, confirmPassword.value); // true // false
    if (isValidPasswordMatch) {
        confirmPasswordErrorNotMatching.classList.add('hidden');
        isValidPasswordMatch = true;
    } else {
        confirmPasswordErrorNotMatching.classList.remove('hidden');
    }
    const isFormValid =
        isFirstName &&
        isEmail &&
        isValidEmail &&
        isPassword &&
        isConfirmPassword &&
        isValidPasswordMatch;

    if (isFormValid) {
        const userData = {
            name: firstName.value,
            email: email.value,
            password: password.value,
        };
        console.log('Validation SUCCEEDED!!  🥳');
        (async function signUpUser() {
            try {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                };
                const response = await fetch(USER_SIGNUP_URL, options);
                const data = await response.json();

                if (response.ok) {
                    location.replace('./login.html');
                } else {
                    console.log('GENERAL ERROR');
                    generalErrorMessage.innerHTML = `We're sorry, ${data.message}`;
                }
            } catch (e) {
                console.log(e);
            }
        })();
    } else {
        console.log('validation fail...');
    }
});
