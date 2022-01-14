const data = [
  [2, 2, "b", "b"],
  [2, 16, "b", "b"],
  [2, 4, "b", "b"],
  [2, 4, "b", "b"],
];
const board = document.getElementsByClassName("board")[0];

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

console.log("hello");
