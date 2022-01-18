import { right, left, up, down, generateTile } from "./move";
const data = [
  [2, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 2, 0, 0],
  [0, 4, 4, 0],
];

const board = document.getElementsByClassName("board")[0];

window.onload = () => {
  document.getElementById("board-container").classList.toggle("play-screen");
  document.getElementById("score-container").classList.toggle("play-screen");
};

// Render the board from the data array
const rerenderBoard = () => {
  board.innerHTML = "";
  data.forEach((row, i) => {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    row.forEach((item, j) => {
      const tile = document.createElement("div");
      tile.textContent = item !== 0 ? item : "";

      //Set id to the tile's position for reference
      tile.id = i.toString() + j.toString();

      //Set class name to the tile's value for appropriate styling
      tile.className = "tile t" + tile.textContent;

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

  var matchedTiles = [];
  if (e.keyCode == "38") {
    matchedTiles = up(data);
    board.style.animation = "up 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "40") {
    matchedTiles = down(data);
    board.style.animation = "down 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "37") {
    matchedTiles = left(data);
    board.style.animation = "left 0.5s ease-in-out 0s 1 forwards";
  } else if (e.keyCode == "39") {
    matchedTiles = right(data);
    board.style.animation = "right 0.5s ease-in-out 0s 1 forwards";
  }

  if (matchedTiles.length > 0) {
    generateTile(data);
    // TODO : KSH : 01/26/2022 : Generate New Tile on Board
    // TODO : KSH : 01/26/2022 : Check if the board is full and unplayable (You Lose)
  }
  rerenderBoard();

  //Animate Matched Tiles
  if (matchedTiles.length > 0) {
    console.log(matchedTiles);

    matchedTiles.forEach(tile => {
      const matchedTile = document.getElementById(
        tile[0].toString() + tile[1].toString()
      );
      console.log(matchedTile);
      //trigger Animation Reflow
      matchedTile.style.animation = "none";
      matchedTile.offsetHeight;
      matchedTile.style.animation = null;

      //Apply the animation to the matched tiles
      matchedTile.style.animation = "match 0.5s ease-in-out 0s 1 forwards";
    });
  }
};

//Initalize collapse button click event listener
document.getElementById("collapseBtn").onclick = () => {
  document.getElementById("score-container").classList.toggle("collapse");
};

document.getElementById("play-btn").onclick = () => {
  document.getElementById("board-container").classList.toggle("play-screen");
  document.getElementById("score-container").classList.toggle("play-screen");
  document.onkeydown = checkKey;
};
