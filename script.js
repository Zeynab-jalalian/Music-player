const play = document.querySelector(".play");
const spentTime = document.querySelector(".spent-time");
const totalTime = document.querySelector(".total-time");
const progress = document.querySelector(".progress");
const progressIn = document.querySelector(".progress-in");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const song = document.querySelector(".song");
const singer = document.querySelector(".singer");
const img = document.querySelector(".img-box img");
const swiperWrapper = document.querySelector(".swiper-wrapper");

const songs = [
     {
    title: "Freaks",
    singer: "Surf Curse",
    cover: "img/freaks.jpg",
    file: "musics/freaks.mp3",
  },
  {
    title: "No Time to Die",
    singer: "Billie Eilish",
    cover: "img/no.png",
    file: "musics/no.mp3",
  },
  {
    title: "The Winner Takes It All",
    singer: " ABBA",
    cover: "img/winner.jpg",
    file: "musics/winner.mp3",
  },
  {
    title: "Save Your Tears",
    singer: "The Weeknd",
    cover: "img/save.jpg",
    file: "musics/save.mp3",
  },
  {
    title: "Sweater Weather",
    singer: "The Neighbourhood",
    cover: "img/sweater.jpg",
    file: "musics/sweater.mp3",
  },
  {
    title: "Summertime Sadness",
    singer: "Lana Del Rey",
    cover: "img/summer.jpg",
    file: "musics/summer.mp3",
  },
  {
    title: "Someone Like You",
    singer: "Adele",
    cover: "img/someone.jpg",
    file: "musics/someone.mp3",
  },
  {
    title: "Flying",
    singer: "Anathema",
    cover: "img/flying.jpg",
    file: "musics/flying.mp3",
  },
  {
    title: "Sign of the Times",
    singer: "Harry Styles",
    cover: "img/sign.png",
    file: "musics/sign.mp3",
  },
];

let currentSongIndex = 0;
let isDragging = false;
let audio = new Audio();

function loadSong(index) {
  audio.src = songs[index].file;
  song.textContent = songs[index].title;
  singer.textContent = songs[index].singer;
  img.src = songs[index].cover;
  audio.load();
  pauseSong();
}

function playSong() {
  audio.play();
  play.classList.remove("bi-play-circle-fill");
  play.classList.add("bi-pause-circle-fill");
}

function pauseSong() {
  audio.pause();
  play.classList.add("bi-play-circle-fill");
  play.classList.remove("bi-pause-circle-fill");
}

// Play / Pause
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Next / Prev
next.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
  swiper.slideToLoop(currentSongIndex);
});

prev.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
  swiper.slideToLoop(currentSongIndex);
});

// Time update
audio.addEventListener("loadedmetadata", () => {
  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60)
    .toString()
    .padStart(2, "0");
  totalTime.textContent = `${minutes}:${seconds}`;
});

audio.addEventListener("timeupdate", () => {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60)
    .toString()
    .padStart(2, "0");
  spentTime.textContent = `${minutes}:${seconds}`;
  progressIn.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

// Progress bar
progress.addEventListener("click", (e) => {
  audio.currentTime = (e.offsetX / progress.clientWidth) * audio.duration;
});

progress.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateProgress(e);
});
progress.addEventListener("mousemove", (e) => {
  if (isDragging) updateProgress(e);
});
document.addEventListener("mouseup", () => {
  isDragging = false;
});

function updateProgress(e) {
  const clickX = e.offsetX || e.clientX - progress.getBoundingClientRect().left;
  audio.currentTime = (clickX / progress.clientWidth) * audio.duration;
}
loadSong(currentSongIndex);

songs.forEach((item, index) => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");

  slide.innerHTML = `
    <img src="${item.cover}" />
    <p>${item.title}</p>
  `;

  slide.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    playSong();
    swiper.slideToLoop(index);
  });

  swiperWrapper.appendChild(slide);
});
const swiper = new Swiper(".song-swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  centeredSlides: true,
  loop: true,
});
swiper.slideToLoop(currentSongIndex);
