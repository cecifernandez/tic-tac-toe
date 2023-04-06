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

  return { board, resetBoard, setSign, getSquare };
})();

const displayController = (() => {
  //Code here
})();

const Game = () => {
  const playerO = Player("Player O", "O");
  const playerX = Player("Player X", "X");

  return { playerO, playerX };
};

const Player = (name, sign) => {
  const getName = () => name;
  const getSign = () => sign;

  return { getName, getSign };
};
