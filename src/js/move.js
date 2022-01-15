export const up = board => {
  console.log("up");
};
export const down = board => {
  console.log("down");
};
export const left = board => {
  console.log("left");
};
export const right = board => {
  // [0, 0, 0, 4],
  // [0, 0, 2, 16],
  // [2, 4, 0, 0],
  // [2, 4, 0, 0],
  //1. Loop through every single tile on the board, from the left to the right, one
  //   row at a time
  //2. If the tile to the right has a value equal to the current tile's value,
  //   combine the tiles into the current tile and make the right tile blank
  //3. Move the current tile to the right as many spaces as there are blanks,
  //   replacing each tile that was moved with a 0.
  //4. After every tile that is moved, loop over the row again to account for any new
  //   blank spots.

  console.log("right");
};
