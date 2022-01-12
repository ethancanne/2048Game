const data = [
  [2, 2, 0, 0],
  [2, 4, 0, 0],
  [2, 4, 0, 0],
  [2, 4, 0, 0],
];
const board = document.getElementsByClassName("board")[0];

data.forEach(row => {
  const rowElement = document.createElement("div");
  rowElement.className = "row";

  row.forEach(item => {
    const tile = document.createElement("div");
    tile.textContent = item;
    tile.className = "tile";
    rowElement.appendChild(tile);
  });
  board.appendChild(rowElement);
});

console.log("hello");
