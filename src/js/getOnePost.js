import { GET_SINGLE_LISTING_URL } from './settings/api';

const listing = document.querySelector('#listings');
const listingInfo = document.querySelector('#listingsInfo');
const listingImg = document.querySelector('#listingsImg');
const listingTitle = document.querySelector('#listingTitle');
const listingDescription = document.querySelector('#listingDescription');
const listingSellerName = document.querySelector('#listingSellerName');
// Get the current URL
let urlParams = new URLSearchParams(window.location.search);
let paramId = urlParams.get('listingId');
let listingId = paramId.substr(1, paramId.length - 2);
console.log(listingId);
async function getListings() {
    try {
        const response = await fetch(
            `https://api.noroff.dev/api/v1/auction/listings/${listingId}`,
            {
                method: 'GET',
            }
        );
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
getListings();
