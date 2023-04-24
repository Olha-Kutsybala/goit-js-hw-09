import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let firstDelay = evt.currentTarget.delay.valueAsNumber;
  const delayStep = evt.currentTarget.step.valueAsNumber;
  const amountOfPromise = evt.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= amountOfPromise; position += 1) {
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += delayStep;
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
