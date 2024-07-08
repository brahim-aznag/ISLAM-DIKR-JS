/* -------------------------------- JSON DATA ------------------------------- */

const jsonData = {
    "abdo_basit_abdo_samad": [
        {
            "surahNumber": 1,
            "surahNameAr": "الفاتحة",
            "surahAudioLink": "https:\/\/audio.jukehost.co.uk\/Cpf2Y8wCeXhGSQqaAF7rP7QwLND8FwKG",
            "surahSvgLink": "https:\/\/uploads-ssl.webflow.com\/6687b54a487f06f0128da746\/668810fa1ace89004c0c6d24_1.svg",
            "reciterName": "عبد الباسط عبد الصمد"
        },
        {
            "surahNumber": 2,
            "surahNameAr": "البقرة",
            "surahAudioLink": "https:\/\/audio.jukehost.co.uk\/C906M3kSq1Hh7VwsuMWjV6lDY0Y8wOXc",
            "surahSvgLink": "https:\/\/uploads-ssl.webflow.com\/6687b54a487f06f0128da746\/668810fa3a69cdb0eabd83be_2.svg",
            "reciterName": "عبد الباسط عبد الصمد"
        },
        {
            "surahNumber": 3,
            "surahNameAr": "آل عمران",
            "surahAudioLink": "https:\/\/audio.jukehost.co.uk\/Q6UnYEHxgg2ag648G3r73qDdwrHYOKBN",
            "surahSvgLink": "https:\/\/uploads-ssl.webflow.com\/6687b54a487f06f0128da746\/66880ec86f5292cdfe0fca79_%C3%98%C2%A2%C3%99%E2%80%9E%20%C3%98%C2%B9%C3%99%E2%80%A6%C3%98%C2%B1%C3%98%C2%A7%C3%99%E2%80%A0.svg",
            "reciterName": "عبد الباسط عبد الصمد"
        },
        {
            "surahNumber": 4,
            "surahNameAr": "النساء",
            "reciterName": "عبد الباسط عبد الصمد"
        },



    ]
};



/* --------------------------------- JS CODE -------------------------------- */

// Select the original track element
const originalTrackElement = document.querySelector('.track-item');
const container = document.querySelector('.tracklist'); // Container for all track elements

// Loop through the surahs array in the JSON data
jsonData.abdo_basit_abdo_samad.forEach((surah) => {

    // Clone the original track element
    const trackClone = originalTrackElement.cloneNode(true);

    // adding event listener when the track is clicked it shows the global player bellow
    trackClone.addEventListener('click', (e) => {
        document.querySelector('.main-media-player').style.display = "flex";
        document.querySelector('.main-media-player').style.transform = "translate3d(0px, 0px, 0px)";
    })


    // Populate the cloned element with data from the JSON
    trackClone.querySelector('.track-number').textContent = surah.surahNumber;
    trackClone.querySelector('.track-title').textContent = surah.surahNameAr;
    trackClone.querySelector('.track-thumbnail-surah-svg').src = surah.surahSvgLink || '';
    trackClone.querySelector('.track-url').innerHTML = surah.surahAudioLink || '';

    // This for the player plugin data
    trackClone.querySelector('.track-name').textContent = surah.surahNameAr;
    trackClone.querySelector('.track-genres').textContent = "سورة";
    trackClone.querySelector('.track-image').src = surah.surahSvgLink || '';

    // Append the cloned element to the container
    container.appendChild(trackClone);

    // Getting the duration of the mp3 audio as hh:mm:ss
    fetchAudioDuration(surah.surahAudioLink).then(duration => {
        //appending duration in HTML after formatting it like this hh:mm:ss
        trackClone.querySelector('.track-time').innerHTML = formatDuration(duration);
    });

});


// hide the badge
document.querySelector('.w-webflow-badge').remove();







/* ----------------------------------- /FUNCTIONS/ ----------------------------------- */

// Function to fetch the audio file and get its duration
function fetchAudioDuration(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        audio.addEventListener('error', (e) => {
            reject(e);
        });
    });
}


// Function to format the duration in hh:mm:ss or mm:ss
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    if (hours > 0) {
        const formattedHours = hours < 10 ? '0' + hours : hours;
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}


/* ----------------------------------- /Observer/ ----------------------------------- */

// Function to log the current element with the class 'track-item is-current'
function logCurrentElement(mutationsList, observer) {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('track-item') && target.classList.contains('is-current')) {

                // Adding the thumbnail to the global player
                document.querySelector('#global-player-thumbnail-js').innerHTML = target.querySelector('.track-thumbnail').outerHTML;
            }
        }
    });
}

// Create a MutationObserver instance and pass the callback function
const observer = new MutationObserver(logCurrentElement);

// Define the element to observe (e.g., the document body)
const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = {
    attributes: true, // Listen for changes to attributes
    subtree: true,    // Include all descendants in the observation
    attributeFilter: ['class'] // Only observe changes to the 'class' attribute
};

// Start observing the target node for configured mutations
observer.observe(targetNode, config);