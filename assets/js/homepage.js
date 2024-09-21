let addSong = document.querySelector('#modal-trigger');
let modal = document.querySelector('dialog');
let closeModal= document.querySelector('#close');

addSong.addEventListener('click', () => {
    modal.showModal();
} );

closeModal.addEventListener('click', () => {
    modal.close();
});