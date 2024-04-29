const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// keep track of song index
let songIndex = 2;

// Update song details
const loadSong = (song) => {
  title.innerText = song;

  cover.src = `images/${song}.jpg`;
  audio.src = `music/${song}.mp3`;
};

// pause song
const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.replace("fa-pause", "fa-play");

  audio.pause();
};

// play song
const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.replace("fa-play", "fa-pause");

  audio.play();
};

// Previous song
const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Next song
const nextSong = () => {
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Update progress bar
const updateProgress = (e) => {
  const { duration, currentTime } = e.target;
  const songPercentage = Math.floor((currentTime / duration) * 100);

  progress.style.width = `${songPercentage}%`;
};

// Jump to parts of the song based on user click on the progress container
const switchProgress = (e) => {
  const { clientWidth } = e.target;
  const { offsetX } = e;

  const songDuration = audio.duration;

  const songPercentage = (offsetX / clientWidth) * 100;

  progress.style.width = `${songPercentage}%`;

  audio.currentTime = (offsetX / clientWidth) * songDuration;
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", switchProgress);
audio.addEventListener("ended", nextSong);
