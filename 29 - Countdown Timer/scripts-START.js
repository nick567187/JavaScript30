let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const later = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(later);
  

  countdown = setInterval(() => {
    const secondsLeft = Math.round((later - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  let adjustedHour = hour > 12 ? hour - 12 : hour;
  if (adjustedHour === 0) {
    adjustedHour = 12;
  }
  endTime.textContent = `Get ready to pump more code out at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(60 * mins);
  this.reset();
});