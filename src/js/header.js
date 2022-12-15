import { GET_LISTINGS_URL } from './settings/api';
import { getUserName } from './utils/storage';
import { getUserAvatar } from './utils/storage';
import { getToken } from './utils/storage';

const accessToken = getToken();
const headerUserWrapper = document.querySelector('#headerUserWrapper');
const headerUserName = document.querySelector('#headerUserName');
const headerUserAvatarPlaceholder = document.querySelector('#headerUserAvatarPlaceholder');
console.log(getUserAvatar());
headerUserName.innerHTML = `<button id="toggle-dropdown" style="font-weight:600;">${getUserName()} <span style="font-size:14px;">▼</span></button>`;
if (!getUserAvatar()) {
} else {
    headerUserAvatarPlaceholder.classList = 'hidden';
    headerUserWrapper.innerHTML += `<img src="${getUserAvatar()}" alt="User avatar image" class="h-16 w-16 rounded-full object-cover object-center">`;
}

if (!accessToken) {
    headerUserWrapper.innerHTML = `
        <a href="./login.html" class="hover:border-b-2">Login</a>
        <a href="./register.html" class="text-secondary hover:border-b-2">register</a>`;
    headerUserWrapper.classList = 'flex items-center w-fit my-auto gap-4 text-500';
}
