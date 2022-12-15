import { USER_LOGIN_URL } from './settings/api';
import { validateEmail } from './utils/validation';
import { saveUser, saveToken } from './utils/storage';

const loginForm = document.querySelector('#loginForm');

const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');

const generalErrorMessage = document.querySelector('#general-error-message');

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

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

        const isFormValid = isEmail && isValidEmail && isPassword;

        if (isFormValid) {
            console.log('Validation SUCCEEDED!!  🥳');
            const userData = {
                email: email.value,
                password: password.value,
            };

            const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`;

            (async function logInUser() {
                const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    const data = await response.json();
                    saveToken(data.accessToken);
                    const userToSave = {
                        name: data.name,
                        email: data.email,
                        avatar: data.avatar,
                    };
                    console.log(userToSave);
                    saveUser(userToSave);
                    location.href = '/';
                } else {
                    const err = await response.json();
                    const message = `An error occurred: ${err.message}`;
                    throw new Error(message);
                }
            })().catch((err) => {
                generalErrorMessage.innerHTML = `We're sorry, ${data.message}`;
            });
        } else {
            console.log('Validation FAILED!! 💩');
        }
    });
}
