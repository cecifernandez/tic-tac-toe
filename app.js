const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const setSign = (index, sign) => {
    if (index > board.length) {
      return;
    } else {
      board[index] = sign;
    }
  };

  const getSquare = (index) => {
    if (index > board.length) {
      return;
    } else {
      return board[index];
    }
  };

  return { resetBoard, setSign, getSquare };
})();

const displayController = (() => {
  const squareEl = document.querySelectorAll(".square");

  squareEl.forEach((square) => {
    square.addEventListener("click", (e) => {
      if (e.target.textContent === "" && Game.gameOver == false) {
        Game.playRound(parseInt(e.target.dataset.index));
        updateBoard();
      } else {
        return;
      }
    });
  });

  const updateBoard = () => {
    for (let i = 0; i < squareEl.length; i++) {
      squareEl[i].textContent = Gameboard.getSquare(i);
    }
  };

  return { updateBoard };
})();

const Player = (name, sign) => {
  const getName = () => name;
  const getSign = () => sign;

  return { getName, getSign };
};

const Game = (() => {
  const playerO = Player("Player O", "O");
  const playerX = Player("Player X", "X");
  let round = 1;
  let gameOver = false;

  const currentPlayer = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const playerWins = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    return winConditions.some((threeRow) =>
      threeRow.every((index) => Gameboard.getSquare(index) === currentPlayer())
    );
  };

  const playRound = (sqrIndex) => {
    Gameboard.setSign(sqrIndex, currentPlayer());
    if (playerWins() === true) {
      gameOver == true;
      return;
    }
    round++;
  };

  return { playRound, playerO, playerX, currentPlayer, gameOver };
})();
