import { POST_LISTINGS_URL } from './settings/api';
import { getToken } from './utils/storage';
const form = document.querySelector('#newListing');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.tags = [data.tag1, data.tag2, data.tag3];
    data.media = [data.media];
    delete data.tag1;
    delete data.tag2;
    delete data.tag3;

    console.log(data);
    fetch('https://nf-api.onrender.com/api/v1/auction/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('modal').style.display = 'flex';
            document.getElementById('close-modal').addEventListener('click', () => {
                document.getElementById('modal').style.display = 'none';
                document.getElementById('newListingBody').classList += '.modal-mode-body';
                window.location.href = './pfp.html';
            });
        })
        .catch((error) => console.error(error));
});
