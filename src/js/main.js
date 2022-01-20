import { right, left, up, down, generateTile, validateBoard } from "./move";
var data = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const board = document.getElementsByClassName("board")[0];
var score = 0;

// Basic function to restart the game for a new playthrough
const restartGame = () => {
  score = 0;
  data = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  generateTile(data);
  rerenderBoard(data);
  document.getElementById("score").textContent = score;
  document.getElementById("board-container").classList.add("play-screen");
  document.getElementById("side-container").classList.add("play-screen");
};

// Restart the game as the page loads
window.onload = () => {
  restartGame();
};

// TODO : 01/19/2022 : Replace with a more elequent message
const loseGame = () => {
  window.alert("You lose! Good Day Sir!");
  if(window.confirm("Do you want to try again?"))
  {
    restartGame();
  }
  return false;
}

// Render the board from the data array
const rerenderBoard = () => {
  board.innerHTML = "";
  data.forEach((row, i) => {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    row.forEach((item, j) => {
      const tile = document.createElement("div");
      tile.textContent = item !== 0 ? item : "";

      // Set id to the tile's position for reference
      tile.id = i.toString() + j.toString();

      // Set class name to the tile's value for appropriate styling
      tile.className = "tile t" + tile.textContent;

      rowElement.appendChild(tile);
    });
    board.appendChild(rowElement);
  });
};

// Initalize arrow key event listeners
const checkKey = e => {
  // Use do...while(0) for breakable "if" statement
  do
  {
    // Reflow the animations
    board.style.animation = "none";
    board.offsetHeight;
    board.style.animation = null;

    // Grab the event with the key code
    e = e || window.event;
    e.keyCode = parseInt(e.keyCode);

    // Exit if invalid arrow key
    if((e.keyCode < 37) || (e.keyCode > 41))
    {
      break;
    }

    var matched = {};
    if (e.keyCode == 38) {
      matched = up(data);
      board.style.animation = "up 0.5s ease-in-out 0s 1 forwards";
    } else if (e.keyCode == 40) {
      matched = down(data);
      board.style.animation = "down 0.5s ease-in-out 0s 1 forwards";
    } else if (e.keyCode == 37) {
      matched = left(data);
      board.style.animation = "left 0.5s ease-in-out 0s 1 forwards";
    } else if (e.keyCode == 39) {
      matched = right(data);
      board.style.animation = "right 0.5s ease-in-out 0s 1 forwards";
    }

    // Generate a new tile if there was any shift
    if (matched.didShift) {
      const newTilePos = generateTile(data);
      rerenderBoard();

      const newTileObj = document.getElementById(
        newTilePos[0].toString() + newTilePos[1].toString()
      );

      // Trigger Animation Reflow
      newTileObj.style.animation = "none";
      newTileObj.offsetHeight;
      newTileObj.style.animation = null;

      // Apply the animation to the newly generated tile
      newTileObj.style.animation = "new 0.3s ease-in-out 0s 1 forwards";
    }

    // Animate the matched tiles after the board has been rerendered
    // Add to the score
    if (matched.tiles.length > 0) {
      matched.tiles.forEach(tile => {
        const matchedTile = document.getElementById(
          tile[0].toString() + tile[1].toString()
        );
        score += parseInt(matchedTile.textContent);
        const scoreTxtObj = document.getElementById("score");
        scoreTxtObj.textContent = score;

        // TRIGGER ANIMATIONS:

        // Trigger Score Text Animation Reflow
        scoreTxtObj.style.animation = "none";
        scoreTxtObj.offsetHeight;
        scoreTxtObj.style.animation = null;

        // Apply the animation to Score Text
        scoreTxtObj.style.animation = "addScore 0.5s ease-in-out 0s 1 forwards";

        // Trigger Animation Reflow for the matched tile
        matchedTile.style.animation = "none";
        matchedTile.offsetHeight;
        matchedTile.style.animation = null;

        // Apply the animation to the matched tiles
        matchedTile.style.animation = "match 0.5s ease-in-out 0s 1 forwards";
      });
    }

    // If board is no longer valid, alert the user asynchronously
    if(!validateBoard(data))
    {
      setTimeout(loseGame, 1000);
    }
  }
  while(0);
};

// Initalize collapse button click event listener
document.getElementById("collapseBtn").onclick = () => {
  document.getElementById("side-container").classList.toggle("collapse");
};

// Initalize play button click event listener
document.getElementById("play-btn").onclick = () => {
  document.getElementById("board-container").classList.remove("play-screen");
  document.getElementById("side-container").classList.remove("play-screen");
  document.onkeydown = checkKey;
};

// Initalize end button click event listener
document.getElementById("end-btn").onclick = () => {
  loseGame();
};
