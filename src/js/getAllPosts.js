import { GET_LISTINGS_URL } from './settings/api';

const listingsWrapper = document.querySelector('#auctionListings');

async function getListings() {
    try {
        const response = await fetch(GET_LISTINGS_URL, { method: 'GET' });
        const data = await response.json();

        for (let i = 0; i < 19; i++) {
            console.log(data[i]);
            const listing = data[i];
            const bidsArray = listing.bids;
            if (bidsArray.length > 0) {
                const sortedArray = bidsArray.sort(function (a, b) {
                    return b - a;
                });
                let currentBid = sortedArray[sortedArray.length - 1];
                var currBid = 'Current bid: ' + currentBid.amount;
            } else {
                var currBid = 'No bids';
            }
            const date = new Date(listing.endsAt);
            var formattedTimestamp = date.toLocaleString('en-GB', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            function updateCountdown() {
                const now = new Date();
                const timeRemaining = new Date(listing.endsAt) - now;
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                if (days == 0) {
                    return hours + 'h ' + minutes + 'm ' + 's ';
                } else if (days == 0 && hours == 0) {
                    return minutes + 'm ' + 's ';
                } else {
                    return days + ' days ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
                }
            }
            setInterval(updateCountdown, 1000);
            listingsWrapper.innerHTML += `<a href="listing.html?listingId='${
                listing.id
            }'" id="listing" class="listing">
                        <div class="listing-img">
                            <img
                                id="listingImg${[i]}"
                                class="listing-img-img"
                                src="${listing.media}"
                                alt="listing-picture"
                            />
                        </div>
                        <div class="listing-text-wrapper">
                            <h2 id="listingTitle" class="listing-title">${listing.title}</h2>
                            <div class="flex flex-col items-center">
                                <p id="listingTimeToSale" class="listing-time">
                                    ${updateCountdown()}
                                </p>
                                <p id="listingTimeOfSale" class="listing-time">${formattedTimestamp}</p>
                            </div>
                            <p id="listingsCurrentBid" class="listing-current-bid">
                                ${currBid}
                            </p>
                        </div>
                    </a>`;
            const listingImg = document.getElementById(`listingImg${[i]}`);
            console.log(i + '' + listingImg.src);

            setTimeout(() => {
                if (listingImg.src == false) {
                    console.log(listingImg);
                }
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
}
getListings();
