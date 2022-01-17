import { right, left, up, down } from "./move";
const data = [
  [4, 0, 0, 0],
  [2, 16, 0, 0],
  [2, 4, 0, 0],
  [2, 4, 0, 0],
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
      tile.textContent = (item !== 0) ? item : "";
      tile.className = "tile";
      rowElement.appendChild(tile);
    });
    board.appendChild(rowElement);
  });
};
rerenderBoard();

//Initalize arrow key event listeners
const checkKey = e => {
  e = e || window.event;

  var okay = false;
  if (e.keyCode == "38") {
    okay = up(data);
  } else if (e.keyCode == "40") {
    okay = down(data);
  } else if (e.keyCode == "37") {
    okay = left(data);
  } else if (e.keyCode == "39") {
    okay = right(data);
  }

  okay = true;
  if(okay)
  {
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
