const data = [1, 3, 5, 2, 3, 332, 3];
const newData = data.map(item => item * 7);
const app = document.getElementById("app");
newData.forEach(item => {
  let tile = document.createElement("div");
  tile.textContent = item;
  tile.className = "tile";
  app.appendChild(tile);
});

console.log("hello");
