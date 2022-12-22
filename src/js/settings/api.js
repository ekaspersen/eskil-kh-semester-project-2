import { getUserName } from '../utils/storage';

const userName = getUserName();
console.log('userName: ', userName);
const API_BASE_URL = 'https://api.noroff.dev/api/v1/auction/';
// AUTH
const USER_LOGIN_URL = `${API_BASE_URL}auth/login`;
const USER_SIGNUP_URL = `${API_BASE_URL}auth/register`;

// LISTINGS
let listingID = '';
const POST_LISTINGS_URL = `${API_BASE_URL}listings`;
const GET_LISTINGS_URL = `${API_BASE_URL}listings?sort=created&sortOrder=desc&_bids=true`;
const GET_SINGLE_LISTING_URL = `${API_BASE_URL}listings/`;

// PROFILES
const GET_USER_URL = `${API_BASE_URL}profiles/${userName}?_listings=true`;
export {
    API_BASE_URL,
    USER_LOGIN_URL,
    USER_SIGNUP_URL,
    GET_LISTINGS_URL,
    GET_SINGLE_LISTING_URL,
    GET_USER_URL,
    POST_LISTINGS_URL,
};
