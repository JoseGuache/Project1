// Helper function to extract query parameters from URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const artist = params.get('artist');
    return { title, artist };
  }
  
  // Automatically search for the song and lyrics on page load
  function searchSong() {
    const { title, artist } = getQueryParams();
    if (title && artist) {
      lyricsApi(title, artist);
      populateSpotifyApi(`${artist} ${title}`);
    }
  }
  
  // Spotify API
  async function populateSpotifyApi(query) {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=1&numberOfTopResults=5`;
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
      displaySong(result);
    } catch (error) {
      console.error('Error fetching song:', error);
    }
  }
  
  // Displays the song in the Spotify iframe
  function displaySong(results) {
    const searchFrame = document.querySelector("#spotifyPlayer");
    searchFrame.src = `https://open.spotify.com/embed/track/${results.tracks.items[0].data.id}`;
  }
  
  // Lyrics API
  async function lyricsApi(title, artist) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
  
    try {
      const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`, requestOptions);
      const results = await response.json();
      displayLyrics(results);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
    }
  }
  
  // Displays the lyrics on the page
  function displayLyrics(results) {
    const lyricsFrame = document.querySelector("#lyricsFrame");
    if (results.lyrics) {
      lyricsFrame.innerHTML = `<h2>Lyrics:</h2>
      ${results.lyrics.substring(0, 350)}...<div aria-label="Modal demo" id="modal-demo"><button class="outline contrast">Read More</button></div>`;
      const lyricContent = document.querySelector("#lyricContent");
      lyricContent.innerHTML = results.lyrics;
      const modalEL = document.querySelector("#modal-demo");
      modalEL.addEventListener("click", showModal);
    } else {
      lyricsFrame.innerHTML = `<h2>No lyrics found for this song.</h2>`;
    }
  }
  
  // Modal functionality for lyrics view
  const closeBtn = document.querySelector("#closeBtn");
  closeBtn.addEventListener('click', closeModal);
  
  // Close the modal
  function closeModal() {
    const dialog = document.querySelector("#dialog");
    dialog.removeAttribute("open");
  }
  
  // Opens the modal to show full lyrics
  function showModal() {
    const dialog = document.querySelector("#dialog");
    dialog.setAttribute("open", "open");
  }
  
  // Call the function to search for the song and lyrics when the page loads
  searchSong();
  