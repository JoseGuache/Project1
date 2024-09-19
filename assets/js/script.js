const searchBtnEl= document.querySelector("#search-btn")
searchBtnEl.addEventListener("click", searchVideo)
function searchVideo(){
    const searchVideoEl= document.querySelector("#search-video")
    const videoName= searchVideoEl.value;
    populateYouTubeApi(videoName)
}

async function populateYouTubeApi(params) {
    const url = `https://youtube138.p.rapidapi.com/search/?q=${params}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd7fb9c3aaemsh388a0c9be405d08p1ba070jsne10eef8695fc',
            'x-rapidapi-host': 'youtube138.p.rapidapi.com'
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

function displayVideo(results){
    const searchFrame= document.querySelector("#video-frame");
    searchFrame.src= `https://www.youtube.com/embed/${results.contents[0].video.videoId}`
}
// populateYouTubeApi('beach boys');