const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const newGameBtn = document.querySelector("#new-btn");
const resetBtn = document.querySelector("#reset-btn");

let currentPlayer = "X";
let gameActive = true;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      showWinner(gameBoard[a]);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    showDraw();
  }
};

const showWinner = (winner) => {
  msg.innerText = `🎉 ${winner} wins!`;
  msgContainer.classList.remove("hide");
  gameActive = false;
};

const showDraw = () => {
  msg.innerText = `It's a draw! 🤝`;
  msgContainer.classList.remove("hide");
  gameActive = false;
};

const handleClick = (index) => {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    boxes[index].innerText = currentPlayer;
    boxes[index].disabled = true;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

const resetGame = () => {
  currentPlayer = "X";
  gameActive = true;
  gameBoard = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });

  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
