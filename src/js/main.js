import { right, left, up, down } from "./move";
const data = [
  [4, 0, 0, 0],
  [2, 16, 0, 0],
  [2, 4, 0, 0],
  [2, 4, 0, 0],
];

const board = document.getElementsByClassName("board")[0];

//rerender the board from the data array
const rerenderBoard = () => {
  board.innerHTML = "";
  data.forEach(row => {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    row.forEach(item => {
      const tile = document.createElement("div");
      if (item == 0) tile.textContent = "";
      else tile.textContent = item;
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

  if (e.keyCode == "38") {
    up(data);
  } else if (e.keyCode == "40") {
    down(data);
  } else if (e.keyCode == "37") {
    left(data);
  } else if (e.keyCode == "39") {
    right(data);
  }
};

//Initalize collapse button click event listener
document.getElementById("collapseBtn").onclick = () => {
  document.getElementById("score-container").classList.toggle("collapse");
};

document.onkeydown = checkKey;
