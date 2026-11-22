const DEFAULT_TIME_SECONDS = 5; // 5 seconds
const HIGH_SCORE_KEY = "clickathon_high_score_v1";

const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const statusEl = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const clickBtn = document.getElementById("clickBtn");

let timeLeft = DEFAULT_TIME_SECONDS;
let score = 0;
let isRunning = false;
let timerId = null;
let backgroundColor = 'green';

function loadHighScore() {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    const value = raw ? Number(raw) : 0;
    return Number.isFinite(value) ? value : 0;
  } catch (e) {
    return 0;
  }
}

function saveHighScore(value) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch (e) {}
}

let highScore = loadHighScore();

function startGame() {
  if (isRunning) return;
  timeLeft = DEFAULT_TIME_SECONDS;
  score = 0;
  isRunning = true;
  backgroundColor = 'green';
  render();
  timerId = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      stopGame();
    }
    render();
  }, 1000);
}

function stopGame() {
  isRunning = false;
  clearInterval(timerId);
  if (score > highScore) {
    highScore = score;
    saveHighScore(highScore);
    backgroundColor = 'magenta';
  }
  render();
}

function resetGame() {
  isRunning = false;
  timeLeft = DEFAULT_TIME_SECONDS;
  score = 0;
  backgroundColor = 'green';
  clearInterval(timerId);
  render();
}

function onClick() {
  if (!isRunning) return;
  score++;
  render();
}

function render() {
  timeEl.textContent = `${timeLeft}`;
  scoreEl.textContent = `${score}`;
  highScoreEl.textContent = `${highScore}`;
  statusEl.textContent = isRunning ? "Game in progress!" : "Click 'Start' to play.";
  document.body.style.backgroundColor = backgroundColor;
  startBtn.disabled = isRunning;
  resetBtn.disabled = !isRunning && score === 0;
  clickBtn.disabled = !isRunning;
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
clickBtn.addEventListener("click", onClick);

render();
