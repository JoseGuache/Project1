let addSong = document.querySelector('#modal-trigger');
let modal = document.querySelector('dialog');
let closeModal = document.querySelector('#close');

addSong.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;

    if (title && artist) {
        // Redirect to the second page with query parameters
        const url = `index.html?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`;
        console.log('Redirecting to:', url); // For debugging

        // Ensure the second page URL is correct
        window.location.href = url;
    } else {
        alert('Please enter name of artist & name of song they have written.');
    }
});
