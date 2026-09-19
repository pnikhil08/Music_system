// ------------------------------
// Music Data
// ------------------------------

const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        audio: "songs/song1.mp3",
        image: "https://picsum.photos/400/400?random=1"
    },

    {
        title: "Song Two",
        artist: "Artist Two",
        audio: "songs/song2.mp3",
        image: "https://picsum.photos/400/400?random=2"
    },

    {
        title: "Song Three",
        artist: "Artist Three",
        audio: "songs/song3.mp3",
        image: "https://picsum.photos/400/400?random=3"
    }
];


// ------------------------------
// Select Elements
// ------------------------------

const playButton = document.getElementById("play");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const songTitle =
    document.getElementById("song-title");

const artist =
    document.getElementById("artist");

const albumCover =
    document.getElementById("album-cover");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");

const playlistSongs =
    document.querySelectorAll(".song");


// ------------------------------
// Create Audio Object
// ------------------------------

const audio = new Audio();


// Current song index

let songIndex = 0;


// ------------------------------
// Load Song
// ------------------------------

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    albumCover.src = song.image;

    audio.src = song.audio;

    // Remove active class
    playlistSongs.forEach(song => {
        song.classList.remove("active");
    });

    // Add active class
    playlistSongs[index].classList.add("active");
}


// ------------------------------
// Play Song
// ------------------------------

function playSong() {

    audio.play();

    playButton.textContent = "⏸️";
}


// ------------------------------
// Pause Song
// ------------------------------

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶️";
}


// ------------------------------
// Play / Pause Button
// ------------------------------

playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ------------------------------
// Next Song
// ------------------------------

nextButton.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

});


// ------------------------------
// Previous Song
// ------------------------------

previousButton.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

});


// ------------------------------
// Update Progress Bar
// ------------------------------

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

    }

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// ------------------------------
// Load Duration
// ------------------------------

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// ------------------------------
// Change Song Position
// ------------------------------

progress.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// ------------------------------
// Volume Control
// ------------------------------

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// ------------------------------
// Automatically Play Next Song
// ------------------------------

audio.addEventListener("ended", () => {

    nextButton.click();

});


// ------------------------------
// Playlist Click
// ------------------------------

playlistSongs.forEach(song => {

    song.addEventListener("click", () => {

        songIndex =
            Number(song.dataset.index);

        loadSong(songIndex);

        playSong();

    });

});


// ------------------------------
// Convert Seconds → MM:SS
// ------------------------------

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}


// ------------------------------
// Load First Song
// ------------------------------

loadSong(songIndex);