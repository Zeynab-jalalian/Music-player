const play = document.querySelector(".play");
const spentTime = document.querySelector(".spent-time");
const totalTime = document.querySelector(".total-time");
const progress = document.querySelector(".progress");
const progressIn = document.querySelector(".progress-in");

const audioSave = new Audio("musics/save.mp3");
const songs = [
  {
    title: "Save Your Tears",
    singer: "The Weeknd",
    cover: "img/save.jpg",
    file: "musics/save.mp3"
  },
   {
    title: "Sweater Weather",
    singer: "The Neighbourhood",
    cover: "img/sweater.jpg",
    file: "musics/sweater.mp3"
  },
  
   {
    title: "Summertime Sadness",
    singer: "Lana Del Rey",
    cover: "img/summer.jpg",
    file: "musics/summer.mp3"
  },
  
   {
    title: "Someone Like You",
    singer: "Adele",
    cover: "img/someone.jpg",
    file: "musics/someone.mp3"
  },
  
   {
    title: "Freaks",
    singer: "Surf Curse ",
    cover: "img/freaks.jpg",
    file: "musics/freaks.mp3"
  },
  
];

let isDragging = false;

play.addEventListener("click", () => {
  if (play.classList.contains("bi-play-circle-fill")) {
    play.classList.remove("bi-play-circle-fill");
    play.classList.add("bi-pause-circle-fill");

    audioSave.play();
  } else if (play.classList.contains("bi-pause-circle-fill")) {
    play.classList.add("bi-play-circle-fill");
    play.classList.remove("bi-pause-circle-fill");

    audioSave.pause();
  }
});

audioSave.addEventListener("loadedmetadata", () => {
  const minutes = Math.floor(audioSave.duration / 60);
  const seconds = Math.floor(audioSave.duration % 60)
    .toString()
    .padStart(2, "0");
  totalTime.textContent = `${minutes}:${seconds}`;
});

audioSave.addEventListener("timeupdate", () => {
  const minutes = Math.floor(audioSave.currentTime / 60);
  const seconds = Math.floor(audioSave.currentTime % 60)
    .toString()
    .padStart(2, "0");

  spentTime.textContent = `${minutes}:${seconds}`;

  const progressPercent = (audioSave.currentTime / audioSave.duration) * 100;
  progressIn.style.width = `${progressPercent}%`;
});

progress.addEventListener("click", (e) => {
  const width = progress.clientWidth;
  const clickX = e.offsetX;

  const clickPercent = clickX / width;
  audioSave.currentTime = clickPercent * audioSave.duration;
});

progress.addEventListener("mousedown", (e) => {
  isDragging = true;
  updateProgress(e);
});
progress.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateProgress(e);
  }
});
document.addEventListener("mouseup", () => {
  isDragging = false;
});
function updateProgress(e) {
  const width = progress.clientWidth;
  const clickX = e.offsetX || e.clientX - progress.getBoundingClientRect().left;
  const clickPercent = clickX / width;

  audioSave.currentTime = clickPercent * audioSave.duration;
}