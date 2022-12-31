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
getListings();
