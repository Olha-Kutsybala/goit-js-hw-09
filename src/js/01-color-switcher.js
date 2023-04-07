const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body')

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartBtnClick() {
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
    startBtn.setAttribute('disabled', 'disabled');
}

function onStopBtnClick() {
startBtn.removeAttribute('disabled');
 clearInterval(timerId);
}