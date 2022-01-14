const data = [
  [4, "b", "b", "b"],
  [2, 16, "b", "b"],
  [2, 4, "b", "b"],
  [2, 4, "b", "b"],
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
      if (item == "b") tile.textContent = "";
      else tile.textContent = item;
      tile.className = "tile";
      rowElement.appendChild(tile);
    });
    board.appendChild(rowElement);
  });
};
rerenderBoard();

const checkKey = e => {
  e = e || window.event;

  if (e.keyCode == "38") {
    console.log("Up");
  } else if (e.keyCode == "40") {
    console.log("Down");

    // down arrow
  } else if (e.keyCode == "37") {
    console.log("Left");

    // left arrow
  } else if (e.keyCode == "39") {
    console.log("Right");

    // right arrow
  }
};

document.onkeydown = checkKey;
