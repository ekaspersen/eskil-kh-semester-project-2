import { GET_USER_URL } from './settings/api';
import { DELETE_LISTINGS_URL } from './settings/api';
import { getToken } from './utils/storage';
const bidHistory = document.querySelector('#bidHistory');
const bidHistorySpan = document.querySelector('#bidHistorySpan');
const bidBids = document.querySelector('#bidBids');
const bidBidsSpan = document.querySelector('#bidBidsSpan');
async function getAuctions() {
    try {
        const response = await fetch(GET_USER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        console.log(data);
        const listing = data;

        if (data.listings.length > 0) {
            bidHistorySpan.classList = 'hidden';
            for (let i = 0; i < data.listings.length; i++) {
                const date = new Date(data.listings[i].endsAt);
                const today = new Date().getTime();
                if (date < today) {
                    var formattedTimestamp = 'Expired';
                } else {
                    var formattedTimestamp = date.toLocaleString('en-GB', {
                        weekday: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });
                }
                function updateCountdown() {
                    const now = new Date();
                    const timeRemaining = new Date(data.listings[i].endsAt) - now;
                    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    let hours = Math.floor(
                        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                    if (days == 0) {
                        return hours + 'h ' + minutes + 'm ' + 's ';
                    } else if (days == 0 && hours == 0) {
                        return minutes + 'm ' + 's ';
                    } else if (date < today) {
                        formattedTimestamp = 'Expired';
                        days = '0';
                        hours = '0';
                        minutes = '0';
                        seconds = '0';
                        currBid = 'Expired';
                    } else {
                        return days + ' days ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
                    }
                }
                bidHistory.innerHTML += `
            <div  class="p-2 bg-dark300 relative">
                <p class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[70%] text-600">${
                    data.listings[i].title
                }</p>
                <p class="text-white50op">${formattedTimestamp}</p>
                <p>${updateCountdown()}</p>
                <a href="./listing.html?listingId=${
                    data.listings[i].id
                }" class="absolute hover:border-b-2 hover:border-secondary right-2 top-2 text-600 text-secondary">
                    See Auction
                </a>
                <div class="absolute right-2 bottom-2 flex hover:bottom-[6px]">
                    <p id="delete-${
                        data.listings[i].id
                    }" class="cursor-pointer hover:border-b-2 ">Delete</p>
                    <p class="hover:pb-[2px] px-1 pointer-events-none">|</p>
                    <p  id="edit-${
                        data.listings[i].id
                    }" class="cursor-pointer hover:border-b-2  ">Edit</p>
                </div>
            </div>       
        `;

                document
                    .getElementById(`delete-${data.listings[i].id}`)
                    .addEventListener('click', () => {
                        const deletePost = async () => {
                            try {
                                const response = await fetch(
                                    DELETE_LISTINGS_URL + data.listings[i].id,
                                    {
                                        method: 'DELETE',
                                        headers: new Headers({
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${getToken()}`,
                                        }),
                                    }
                                );

                                // Check the status code of the response
                                if (response.status >= 200 && response.status < 300) {
                                    window.location.reload();
                                } else {
                                    throw new Error('Failed to delete post');
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        };
                        deletePost();
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function getBids() {
    try {
        const response = await fetch(GET_USER_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const data = await response.json();
        console.log(data);
        const listing = data;

        if (data.listings.length > 0) {
            bidBidsSpan.classList = 'hidden';
            for (let i = 0; i < data.listings.length; i++) {
                const date = new Date(data.listings[i].endsAt);
                const today = new Date().getTime();
                if (date < today) {
                    var formattedTimestamp = 'Expired';
                } else {
                    var formattedTimestamp = date.toLocaleString('en-GB', {
                        weekday: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    });
                }
                function updateCountdown() {
                    const now = new Date();
                    const timeRemaining = new Date(data.listings[i].endsAt) - now;
                    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    let hours = Math.floor(
                        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                    if (days == 0) {
                        return hours + 'h ' + minutes + 'm ' + 's ';
                    } else if (days == 0 && hours == 0) {
                        return minutes + 'm ' + 's ';
                    } else if (date < today) {
                        formattedTimestamp = 'Expired';
                        days = '0';
                        hours = '0';
                        minutes = '0';
                        seconds = '0';
                        currBid = 'Expired';
                    } else {
                        return days + ' days ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
                    }
                }
                bidBids.innerHTML += `
            <div  class="p-2 bg-dark300 relative">
                <p class="overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[70%] text-600">${
                    data.listings[i].title
                }</p>
                <p class="text-white50op">${formattedTimestamp}</p>
                <p>${updateCountdown()}</p>
                <a href="./listing.html?listingId=${
                    data.listings[i].id
                }" class="absolute hover:border-b-2 hover:border-secondary right-2 top-2 text-600 text-secondary">
                    See Auction
                </a>
                <div class="absolute right-2 bottom-2 flex hover:bottom-[6px]">
                    <p id="delete-${
                        data.listings[i].id
                    }" class="cursor-pointer hover:border-b-2 ">Delete</p>
                    <p class="hover:pb-[2px] px-1 pointer-events-none">|</p>
                    <p  id="edit-${
                        data.listings[i].id
                    }" class="cursor-pointer hover:border-b-2  ">Edit</p>
                </div>
            </div>       
        `;

                document
                    .getElementById(`delete-${data.listings[i].id}`)
                    .addEventListener('click', () => {
                        const deletePost = async () => {
                            try {
                                const response = await fetch(
                                    DELETE_LISTINGS_URL + data.listings[i].id,
                                    {
                                        method: 'DELETE',
                                        headers: new Headers({
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${getToken()}`,
                                        }),
                                    }
                                );

                                // Check the status code of the response
                                if (response.status >= 200 && response.status < 300) {
                                    window.location.reload();
                                } else {
                                    throw new Error('Failed to delete post');
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        };
                        deletePost();
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
getAuctions();
getBids();
