import { right, left, up, down, generateTile, validateBoard } from "./move.js";
var data = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const board = document.getElementsByClassName("board")[0];
const scoreTxtObj = document.getElementById("score");
const highscoreTxtObj = document.getElementById("highscore");
var score = 0;
var hasWon = false;

// Basic function to restart the game for a new playthrough
const startGame = selectedData => {
  score = 0;
  hasWon = false;
  scoreTxtObj.textContent = score;
  highscoreTxtObj.textContent = getCookie("highscore");
  document.getElementById("board-container").classList.add("play-screen");
  document.getElementById("side-container").classList.add("play-screen");
  document.onkeydown = null;
};

const getCookie = key => {
  var cookieArr = document.cookie.split(";");
  for (var cnt = 0; cnt < cookieArr.length; cnt++) {
    var cookiePair = cookieArr[cnt].split("=");

    if (key === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return "0";
};

// Restart the game as the page loads
window.onload = () => {
  startGame();
};

// TODO : 01/19/2022 : Replace with a more elequent message
const loseGame = () => {
  if (Swal.isVisible()) {
    return;
  }
  Swal.fire({
    icon: "error",
    title: "You Lose",
    html: "<h4>Sorry! Do you want to try again?</h4>",
    showCloseButton: true,
    confirmButtonText: "Restart",
  }).then(result => {
    if (result.isConfirmed) {
      saveScore();
      startGame();
    }
  });
};

//You win
const winGame = () => {
  if (Swal.isVisible()) {
    return;
  }
  Swal.fire({
    icon: "success",
    title: "You Won!",
    html: "<h4>Close to continue, or restart for a new board.</h4>",
    showCloseButton: true,
    confirmButtonText: "Restart",
  }).then(result => {
    if (result.isConfirmed) {
      saveScore();
      startGame();
    }
  });
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
  // Reflow the animations
  triggerReflow(board);

  // Grab the event with the key code
  e = e || window.event;
  e.preventDefault(); // Avoid document sliding to the direction used
  var keyCode = parseInt(e.keyCode);

  // Return if invalid arrow key
  if (keyCode < 36 || keyCode > 41) return;

  // Set the animation style depending on the direction
  var direction = e.key.substr("Arrow".length).toLowerCase();
  board.style.animation = direction + " 0.5s ease-in-out 0s 1 forwards";

  var matched = {};
  if (keyCode == 37 || e.detail.dir === "left") {
    matched = left(data);
  } else if (keyCode == 38 || e.detail.dir === "up") {
    matched = up(data);
  } else if (keyCode == 39 || e.detail.dir === "right") {
    matched = right(data);
  } else if (keyCode == 40 || e.detail.dir === "down") {
    matched = down(data);
  }

  // Generate a new tile if there was any shift
  if (matched.didShift) {
    const newTilePos = generateTile(data);
    rerenderBoard();

    const newTileObj = document.getElementById(
      newTilePos[0].toString() + newTilePos[1].toString()
    );

    // Animation reflow and apply the animation to the newly generated tile
    triggerReflow(newTileObj);
    newTileObj.style.animation = "new 0.3s ease-in-out 0s 1 forwards";
  }

  // Animate the matched tiles after the board has been rerendered
  // Add to the score -----------------------------------------------------------------------
  if (matched.tiles.length > 0) {
    // Get tile DOM Elements
    matched.tiles.forEach(tile => {
      if (data[tile[0]][tile[1]] !== 0) {
        //Get tile DOM Elements
        const matchedTile = document.getElementById(
          tile[0].toString() + tile[1].toString()
        );

        // Add to the score variable and set that value to the text content of the score text DOM element
        score += !isNaN(parseInt(matchedTile.textContent))
          ? parseInt(matchedTile.textContent)
          : 0;
        scoreTxtObj.textContent = score;

        if (score > parseInt(highscoreTxtObj.textContent)) {
          highscoreTxtObj.textContent = score;
          saveScore();
          triggerReflow(highscoreTxtObj);
          highscoreTxtObj.style.animation =
            "addScore 0.5s ease-in-out 0s 1 forwards";
        }

        // Animation reflow and apply the animation to Score Text
        triggerReflow(scoreTxtObj);
        scoreTxtObj.style.animation = "addScore 0.5s ease-in-out 0s 1 forwards";

        // Animation reflow and apply the animation to the matched tiles
        triggerReflow(matchedTile);
        matchedTile.style.animation = "match 0.5s ease-in-out 0s 1 forwards";
      }
    });
  }

  // If board is no longer valid, alert the user asynchronously
  if (!validateBoard(data) && !Swal.isVisible()) {
    setTimeout(loseGame, 500);
    hasWon = false;
  }

  // If 2048 is found and the player wins
  if (matched.tiles.length > 0 && !hasWon) {
    // Get tile DOM Elements
    matched.tiles.forEach(tile => {
      if (data[tile[0]][tile[1]] == 2048 && !Swal.isVisible()) {
        setTimeout(winGame, 500);
        hasWon = true;
      }
    });
  }
};

const triggerReflow = obj => {
  obj.style.animation = "none";
  obj.offsetHeight;
  obj.style.animation = null;
};

const saveScore = () => {
  document.cookie =
    "highscore=" + highscoreTxtObj.textContent + "; max-age=3600; path=/";
};

// Initalize collapse button click event listener
document.getElementById("collapseBtn").onclick = () => {
  document.getElementById("side-container").classList.toggle("collapse");
};

// Initalize play button click event listener
document.getElementById("play-btn").onclick = () => {
  const layout = parseInt(document.getElementById("layoutTxt").value);
  if (layout > 100 || layout <= 0 || isNaN(layout)) {
    Swal.fire({
      icon: "error",
      title: "That layout value is invaild!",
      html: "<h4>Please use a different layout value.</h4>",
      showCloseButton: true,
      confirmButtonText: "Ok",
    });
  } else {
    var customBoard = [];

    for (var i = 0; i < layout; i++) {
      customBoard.push([]);
      for (var j = 0; j < layout; j++) {
        customBoard[i].push(0);
      }
    }

    var zoomProperty = 100 - layout * 2.5;
    board.style.zoom = zoomProperty > 6 ? `${zoomProperty}%` : "6%";
    setBoard(customBoard);
  }
};

const setBoard = selectedLayout => {
  data = selectedLayout;
  document.getElementById("board-container").classList.remove("play-screen");
  document.getElementById("side-container").classList.remove("play-screen");
  document.onkeydown = checkKey;
  document.addEventListener("swiped", checkKey);
  generateTile(data);
  rerenderBoard(data);
};

// Initalize end button click event listener
document.getElementById("end-btn").onclick = () => {
  saveScore();
  startGame();
};

document.getElementById("layoutTxt").onchange = () => {
  document.getElementById("by-layout").textContent =
    "by " + document.getElementById("layoutTxt").value;
};
