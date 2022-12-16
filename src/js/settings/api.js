import { getUserName } from '../utils/storage';

const userName = getUserName();
console.log('userName: ', userName);
const API_BASE_URL = 'https://api.noroff.dev/api/v1/auction/';
// AUTH
const USER_LOGIN_URL = `${API_BASE_URL}auth/login`;
const USER_SIGNUP_URL = `${API_BASE_URL}auth/register`;

// LISTINGS
const GET_LISTINGS_URL = `${API_BASE_URL}listings?sort=created&sortOrder=desc&_bids=true`;
//const GET_SINGLE_LISTING_URL = `${API_BASE_URL}listings/${listingID}?_seller=true&_bids=true`;

export {
    API_BASE_URL,
    USER_LOGIN_URL,
    USER_SIGNUP_URL,
    GET_LISTINGS_URL /*GET_SINGLE_LISTING_URL*/,
};
