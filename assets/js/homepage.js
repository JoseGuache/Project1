let addSong = document.querySelector('#modal-trigger');
let modal = document.querySelector('dialog');
let closeModal= document.querySelector('#close');

addSong.addEventListener('click', () => {
    modal.showModal();
} );

closeModal.addEventListener('click', () => {
    modal.close();
});

let form = document.querySelector('form');

let listOfSongs = localStorage.getItem('listOfSongs');

if (listOfSongs === null){
    listOfSongs = [];
    localStorage.setItem('listOfSongs', JSON.stringify(listOfSongs));
} else {
    listOfSongs = JSON.parse(listOfSongs);
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let songTitle = document.getElementById('title');
    let artist = document.getElementById('artist');
    let singleSong = {
        title: songTitle.value,
        artist: artist.value
    }
    listOfSongs.push(singleSong);
    localStorage.setItem('listOfSongs', JSON.stringify(listOfSongs));
    window.location.href = "index.html";
})


