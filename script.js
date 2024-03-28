// JavaScript code
const CreateRandomTextAPI = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const modal = document.getElementById('modal');
const modalWpm = document.getElementById('wpm');
const tryAgainButton = document.getElementById('tryAgain');

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) myFunction();
});

function getRandomQuote() {
  return fetch(CreateRandomTextAPI)
    .then(response => response.json())
    .then(data => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = '';
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function countWordsTyped(inputValue) {
  const trimmedInput = inputValue.trim();
  const wordsArray = trimmedInput.split(/\s+/);
  return wordsArray.length;
}

function myFunction() {
  const wordsTyped = countWordsTyped(quoteInputElement.value);
  const elapsedTime = getTimerTime();
  const wpm = Math.round((wordsTyped / elapsedTime) * 60);
  alert('Typing Done! \nWPM: ' + wpm);
  renderNewQuote();
}

renderNewQuote();
