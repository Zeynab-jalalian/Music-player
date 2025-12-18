const play = document.querySelector(".play");
const spentTime = document.querySelector(".spent-time");
const totalTime = document.querySelector(".total-time");
const progressIn = document.querySelector(".progress-in");

const audioSave = new Audio("musics/save.mp3");

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
