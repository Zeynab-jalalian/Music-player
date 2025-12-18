const play = document.querySelector(".play");



play.addEventListener("click", () => {
  if (play.classList.contains("bi-play-circle-fill")) {
    play.classList.remove("bi-play-circle-fill");
    play.classList.add("bi-pause-circle-fill");
  } else if (play.classList.contains("bi-pause-circle-fill")) {
    play.classList.add("bi-play-circle-fill");
    play.classList.remove("bi-pause-circle-fill");
  }
});
