const searchBtnEl = document.querySelector("#search-btn")
searchBtnEl.addEventListener("click", searchVideo)
function searchVideo() {
    const searchVideoEl = document.querySelector("#search-video")
    const videoName = searchVideoEl.value;
    lyricsApi(videoName)
    populateYouTubeApi(videoName)
}

async function populateYouTubeApi(params) {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${params}&type=multi&offset=0&limit=1&numberOfTopResults=5`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '65cb44869dmsh1ca8806e3e6d0bdp1c12ffjsn3f4b5362f295',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        displayVideo(result)
        // https://www.youtube.com/watch?v=
    } catch (error) {
        console.error(error);
    }
}



function displayVideo(results) {
    const searchFrame = document.querySelector("#spotifyPlayer");
    searchFrame.src = `https://open.spotify.com/embed/track/${results.tracks.items[0].data.id}`
}
// populateYouTubeApi('beach boys');

async function lyricsApi(params) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://api.lyrics.ovh/v1/${params}?=`, requestOptions)
        .then((response) => response.json())
        .then((results) => {
            displayLyrics(results)
            console.log(results)
        })
        .catch((error) => console.error(error));
}

function displayLyrics(results) {
    const lyricsFrame = document.querySelector("#lyricsFrame")
    lyricsFrame.innerHTML = `<h2>Lyrics:</h2>
    ${results.lyrics.substring(0, 350)}
    ...
          <div aria-label="Modal demo" id="modal-demo"><button class="outline contrast">Read More</button></div>
    `
    const lyricContent = document.querySelector("#lyricContent")
    lyricContent.innerHTML = results.lyrics
    const modalEL = document.querySelector("#modal-demo")
    modalEL.addEventListener("click", showModal)
}
const closeBtn = document.querySelector("#closeBtn")
closeBtn.addEventListener('click', closeModal)
function closeModal() {
    const dialog = document.querySelector("#dialog")
    dialog.removeAttribute("open")
}


function showModal() {
    const dialog = document.querySelector("#dialog")
    dialog.setAttribute("open", "open")
}
