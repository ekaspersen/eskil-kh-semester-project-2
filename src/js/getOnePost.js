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
            `https://api.noroff.dev/api/v1/auction/listings/${listingId}?_seller=true&_bids=true`,
            {
                method: 'GET',
            }
        );
        const data = await response.json();
        console.log(data);
        const listing = data;
        listingInfo.innerHTML = `
                <div id="listingsInfo" class="single-listing-info">
                    <div id="listingsImgWrapper" class="single-listing-img-wrapper">
                        <img
                            id="listingImg"
                            class="single-listing-img"
                            src="${listing.media}"
                            alt="picture of, same-as-h1"
                        />
                    </div>
                    <div id="listingText" class="single-listing-text-wrapper">
                        <h1 id="listingTitle" class="single-listing-title">${listing.title}</h1>
                        <p id="listingDescription" class="single-listing-description">${
                            listing.listingDescription || 'No description provided ...'
                        }</p>
                        <p id="ListingSellerName" class="single-listing-seller-name">${
                            listing.seller.name
                        }</p>
                    </div>
                </div>`;
    } catch (error) {
        console.log(error);
    }
}
getListings();
