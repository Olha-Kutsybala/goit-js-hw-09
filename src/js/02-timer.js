import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  mins: document.querySelector('[data-minutes]'),
  secs: document.querySelector('[data-seconds]'),
};
 
refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
    }
  }
  
flatpickr(refs.input, options); 

const onStartBtnClick = () => {
  let intervalId = null;
  intervalId = setInterval(() => {
    const startTime = Date.now();
    const currentTime = new Date(refs.input.value);
    const deltaTime = currentTime - startTime;
    const time = convertMs(deltaTime);
    if(deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    updateClockFace(time);
    refs.startBtn.setAttribute('disabled', 'disabled');
  }, 1000);
};

refs.startBtn.addEventListener('click', onStartBtnClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}


function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${ days }`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}