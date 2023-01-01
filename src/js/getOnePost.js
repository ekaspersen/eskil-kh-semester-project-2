import { getToken } from './utils/storage';
const listingInfo = document.querySelector('#listingsInfo');
const currBids = document.querySelector('#currBids');
const currBidsSpan = document.querySelector('#currBidsSpan');
let urlParams = new URLSearchParams(window.location.search);
let paramId = urlParams.get('listingId');

const listingId = decodeURIComponent(paramId);

async function getListings() {
    try {
        const response = await fetch(
            `https://api.noroff.dev/api/v1/auction/listings/${listingId}?_seller=true&_bids=true`,
            {
                method: 'GET',
            }
        );
        const data = await response.json();
        const listing = data;
        console.log(data);
        let listingMedia;
        if (listing.media.length > 0) {
            listingMedia = listing.media;
        } else {
            listingMedia = './img/no-img.png';
        }
        listingInfo.innerHTML = `
                <div id="listingsInfo" class="single-listing-info">
                    <div id="listingsImgWrapper" class="single-listing-img-wrapper">
                        <img
                            id="listingImg"
                            class="single-listing-img"
                            src="${listingMedia}"
                            alt="listing-picture-if-you-can-see-this-url-is-broken"
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
        for (let i2 = 0; i2 < listing.bids.length; i2++) {
            console.log(listing.bids);
        }
        listing.bids.reverse();
        listing.bids.forEach((bid) => {
            if (listing.bids.length > 0) {
                currBidsSpan.style.display = 'none';
            }
            currBids.innerHTML += `
            <div  class="p-2 bg-dark300 relative">
                   <p class="text-white50op">${bid.bidderName}</p>
                   <p class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[70%] text-600">${bid.amount}</p>
             
                <p></p>
            </div>       
        `;
        });
        /**/
    } catch (error) {
        console.log(error);
    }
}

const form = document.getElementById('placeBidForm');

async function placeBid(event) {
    event.preventDefault();

    const bidAmount = document.getElementById('bidAmount').value;
    console.log(bidAmount);
    try {
        const response = await fetch(
            `https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`,
            {
                method: 'POST',
                body: JSON.stringify({
                    amount: bidAmount,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        console.log(response);
        if (response.ok) {
            window.location.reload();
            return response.json();
        }
        throw new Error('There was an error placing the bid');
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', placeBid);

getListings();
