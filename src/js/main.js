import { right, left, up, down } from "./move";
const data = [
  [2, 2, 2, 0],
  [2, 2, 2, 0],
  [2, 2, 4, 0],
  [2, 4, 2, 0],
];

const board = document.getElementsByClassName("board")[0];

// Render the board from the data array
const rerenderBoard = () => {
  board.innerHTML = "";
  data.forEach(row => {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    row.forEach(item => {
      const tile = document.createElement("div");
      tile.textContent = item !== 0 ? item : "";
      tile.className = "tile";
      rowElement.appendChild(tile);
    });
    board.appendChild(rowElement);
  });
};
rerenderBoard();

//Initalize arrow key event listeners
const checkKey = e => {
  board.style.animation = "none";
  board.offsetHeight; /* trigger reflow */
  board.style.animation = null;
  e = e || window.event;

  var okay = false;
  if (e.keyCode == "38") {
    okay = up(data);
    board.style.animation = "up 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "40") {
    okay = down(data);
    board.style.animation = "down 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "37") {
    okay = left(data);
    board.style.animation = "left 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "39") {
    okay = right(data);
    board.style.animation = "right 0.5s ease-in-out 0s 1 forwards";
  }

  okay = true;
  if (okay) {
    rerenderBoard();
    // TODO : KSH : 01/26/2022 : Generate New Tile on Board
    // TODO : KSH : 01/26/2022 : Check if the board is full and unplayable (You Lose)
  }
};

//Initalize collapse button click event listener
document.getElementById("collapseBtn").onclick = () => {
  document.getElementById("score-container").classList.toggle("collapse");
};

document.onkeydown = checkKey;
