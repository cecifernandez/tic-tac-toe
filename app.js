const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
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

const Player = (sign) => {
  const getSign = () => sign;

  return { getSign };
};

const displayController = (() => {
  const squareEl = document.querySelectorAll(".square");
  const setPvp = document.querySelector("#select-pvp");
  const gameContainer = document.querySelector("#game");
  const homePage = document.querySelector("#home");
  const homeBtn = document.querySelector("#home-btn");
  const playAgainBtn = document.querySelector("#play-again");
  const endGame = document.querySelector("#end-page");

  homeBtn.addEventListener("click", () => {
    homePage.style.display = "block";
    gameContainer.style.display = "none";
    endGame.style.display = "none";
  });

  playAgainBtn.addEventListener("click", () => {
    endGame.style.display = "none";
    Gameboard.resetBoard();
    Game.reset();
    updateBoard();
  });

  setPvp.addEventListener("click", () => {
    homePage.style.display = "none";
    gameContainer.style.display = "grid";
    Gameboard.resetBoard();
    Game.reset();
    updateBoard();
  });

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

const Game = (() => {
  const endGame = document.querySelector("#end-page");
  const result = document.querySelector("#winner");

  const playerO = Player("O");
  const playerX = Player("X");
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
      window.setTimeout(() => {
        endGame.style.display = "flex";
        result.innerHTML = `Player ${currentPlayer()} wins!!`;
      }, 100);

      return;
    }
    round++;
  };

  const reset = () => {
    round = 1;
    gameOver = false;
  };

  return { playRound, currentPlayer, gameOver, reset };
})();
