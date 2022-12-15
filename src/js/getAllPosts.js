import { GET_LISTINGS_URL } from './settings/api';

const listingsWrapper = document.querySelectorAll('#auctionListings');
const listingImgImg = document.querySelectorAll('#listingImg');
const listingTitle = document.querySelectorAll('#listingTitle');
const listingTimeToSale = document.querySelectorAll('#listingTimeToSale');
const listingTimeofSale = document.querySelectorAll('#listingTimeofSale');
const listingCurrentBid = document.querySelectorAll('#listingCurrentBid');

fetch(GET_LISTINGS_URL, { method: 'GET' })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
