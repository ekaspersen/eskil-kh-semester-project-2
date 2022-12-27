/* Place bid: */
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
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.ok) {
            return response.json();
        }
        throw new Error('There was an error placing the bid');
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', placeBid);
