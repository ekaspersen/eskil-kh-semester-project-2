import { POST_LISTINGS_URL } from './settings/api';
import { getToken } from './utils/storage';
const form = document.querySelector('#newListing');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.tags = [data.tag1, data.tag2, data.tag3];
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
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
});
