const inputArr = document.querySelectorAll("input");
const stopwatch = document.querySelector(".stopwatch-container");
const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const audio = new Audio("sounds/time-up.mp3");

let timeConversion = [3600, 60, 1];
let time = 0;
let intervalId = 0;

const reset = function () {
  inputArr.forEach((input) => {
    input.removeAttribute("disabled");
    input.value = "";
  });
  time = 0;
  audio.pause();
  clearInterval(intervalId);
  startBtn.innerText = "Start";
};

const startTimer = function () {
  if (time <= 0) {
    audio.play();
    clearInterval(intervalId);
    startBtn.innerText = "Stop";
  }
  let hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, 0);
  let seconds = time % 3600;
  let minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, 0);
  seconds = (seconds % 60).toString().padStart(2, 0);
  let clock = [hours, minutes, seconds];
  inputArr.forEach((input, i) => {
    input.value = clock[i];
  });
  time--;
};

stopwatch.addEventListener("submit", (e) => e.preventDefault());

startBtn.addEventListener("click", function (e) {
  if (startBtn.innerText === "Start") {
    startBtn.innerText = "Pause";
    inputArr.forEach((input, i) => {
      let value = input.value ? Number(input.value) : 0;
      time += value * timeConversion[i];
      input.setAttribute("disabled", "true");
    });
    startTimer();
    if (time > 0) {
      intervalId = setInterval(startTimer, 1000);
    }
  } else if (startBtn.innerText === "Pause") {
    startBtn.innerText = "Play";
    clearInterval(intervalId);
    audio.pause();
  } else if (startBtn.innerText === "Stop") {
    reset();
  } else {
    startTimer();
    intervalId = setInterval(startTimer, 1000);
    startBtn.innerText = "Pause";
  }
});

resetBtn.addEventListener("click", reset);
