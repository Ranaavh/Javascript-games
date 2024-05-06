

let currentPlayer = 'X';
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let gameActive = true;

const checkWin = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a % 3][Math.floor(a / 3)] && gameBoard[a % 3][Math.floor(a / 3)] === gameBoard[b % 3][Math.floor(b / 3)] && gameBoard[a % 3][Math.floor(a / 3)] === gameBoard[c % 3][Math.floor(c / 3)]) {
      return gameBoard[a % 3][Math.floor(a / 3)];
    }
  }

  return null;
};

const checkDraw = () => {
  for (let row of gameBoard) {
    for (let cell of row) {
      if (!cell) {
        return false;
      }
    }
  }
  return true;
};

const endGame = (winner) => {
  gameActive = false;
  if (winner) {
    document.getElementById('message').innerText = `Player ${winner} wins!`;
  } else {
    document.getElementById('message').innerText = `The game is a draw.`;
  }
};

const makeMove = (row, col) => {
  if (!gameActive || gameBoard[row][col]) {
    return;
  }

  gameBoard[row][col] = currentPlayer;
  document.getElementById('game-board').children[row].children[col].innerText = currentPlayer;

  const winner = checkWin();
  if (winner) {
    endGame(winner);
  } else if (checkDraw()) {
    endGame();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gameActive = true;

  document.getElementById('message').innerText = '';
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.innerText = '');
};
