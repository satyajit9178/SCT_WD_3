let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset');
const msg = document.querySelector('.msg');
const newGameBtn = document.querySelector('.newgame');
const winSound = document.getElementById('win-sound');

let turnO = true;
let count = 0;
let gameOver = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function resetGame() {
  turnO = true;
  count = 0;
  gameOver = false;
  enableBoxes();
  msg.classList.add('hide');
  boxes.forEach(box => box.classList.remove('win'));
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (gameOver) return;

    count++;
    box.innerHTML = turnO ? "⭕️" : "❌";
    turnO = !turnO;
    box.disabled = true;

    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winningCombinations) {
    let [i, j, k] = pattern;
    let pos1 = boxes[i].innerHTML;
    let pos2 = boxes[j].innerHTML;
    let pos3 = boxes[k].innerHTML;

    if (pos1 !== '' && pos1 === pos2 && pos2 === pos3) {
      highlightWinner(i, j, k);
      showWinner(pos1);
      gameOver = true;
      return;
    }
  }

  if (count === 9 && !gameOver) {
    showWinner('');
  }
};

function showWinner(winner) {
  if (winner === '') {
    msg.innerHTML = `<h2>The match is a draw</h2>`;
  } else {
    msg.innerHTML = `<h2>${winner} wins!</h2>`;
    if (winSound) winSound.play();
  }
  msg.classList.remove('hide');
  disableBoxes();
}

function highlightWinner(i, j, k) {
  boxes[i].classList.add('win');
  boxes[j].classList.add('win');
  boxes[k].classList.add('win');
}

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}

function enableBoxes() {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerHTML = '';
    box.classList.remove('win');
  });
}

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
