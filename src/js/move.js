export const up = board => {
  console.log("up");
  var match = false;
  return match;
};
export const down = board => {
  console.log("down");
  var shift = false;
  var match = false;
  var repeated = false;

  var matchedTiles = [];

  // Use do...while() for a breakable "if" statement
  do {
    // Run through each available row
    for (var col = 0; col < board.length; col++) {
      // Shift the available values down
      shift = true;
      while (shift) {
        // Iterate through each column checking the value next to it
        shift = false;
        for (var row = 0; row < board[col].length; row++) {
          // Check if the column below is empty and above is not-empty
          if (board[row + 1][col] === 0 && board[row][col] !== 0) {
            board[row + 1][col] = board[row][col];
            board[row][col] = 0;
            shift = true;
          }
        }
      }
    }

    // Break from do...while() when loop has repeated
    if (repeated) {
      repeated = false;
      break;
    }

    // Match the values
    for (var col = 0; col < board.length; col++) {
      // Match each row by the value below
      for (var row = 0; row < board.length - 1; row++) {
        // Validate the next row exists
        if (row + 1 === 4) {
          break;
        }

        // Do comparisons using [col + 1] for previous element
        if (board[row - 1][col] === board[row][col] && board[row][col] !== 0) {
          board[row][col] = board[row][col] * 2;
          board[row - 1][col] = 0;
          matchedTiles.push([row, col]);
          match = true;
        }
      }
    }

    // Repeat run when fully executed
    repeated = true;
  } while (repeated); // End while() when broken prematurely

  // Return whether or not a successful match has been made
  return matchedTiles;
};

/***********************
 * Shift values to left
 * Match values
 * Shift values to left
 **********************/

 export const left = board => {
  // Declare variables
  var shift = false;
  var repeated = false;
  var matchedTiles = [];
  var didShift = false;

  // Use do...while() for a breakable "if" statement
  do {
    // Run through each available row
    for (var row = 0; row < board.length; row++) {
      // Shift the available values to the left
      shift = true;
      while (shift) {
        // Iterate through each column checking the value next to it
        shift = false;
        for (var col = 1; col < board[row].length; col++) {
          // Check if the column to the left is empty and the right is not-empty
          if (board[row][col - 1] === 0 && board[row][col] !== 0) {
            board[row][col - 1] = board[row][col];
            board[row][col] = 0;
            shift = true;
            didShift = true;
          }
        }
      }
    }

    // Break from do...while() when loop has repeated
    if (repeated) {
      repeated = false;
      break;
    }

    // Match the values
    for (var row = 0; row < board.length; row++) {
      // Match each column by the value to the left
      for (var col = 0; col < board.length - 1; col++) {
        // Validate the next column exists
        if (col + 1 === 4) {
          break;
        }

        // Do comparisons using [col + 1] for previous element
        if (board[row][col + 1] === board[row][col] && board[row][col] !== 0) {
          board[row][col] = board[row][col] * 2;
          board[row][col + 1] = 0;
          matchedTiles.push([row, col]);
          didShift = true;
        }
      }
    }

    // Repeat run when fully executed
    repeated = true;
  } while (repeated); // End while() when broken prematurely

  // Return whether or not a successful match has been made
  return { tiles: matchedTiles, didShift };
};

/***********************
 * Shift values to right
 * Match values
 * Shift values to right
 **********************/

export const right = board => {
  // Declare variables
  var shift = false;
  var matchedTiles = [];
  var repeated = false;
  var didShift;

  // Use do...while() for a breakable "if" statement
  do {
    // Run through each available row
    for (var row = 0; row < board.length; row++) {
      // Shift the available values to the right
      shift = true;
      while (shift) {
        // Iterate through each column checking the value next to it
        shift = false;
        for (var col = board[row].length - 2; col > -1; col--) {
          // Check if the column to the right is empty and the left is not-empty
          if (board[row][col + 1] === 0 && board[row][col] !== 0) {
            board[row][col + 1] = board[row][col];
            board[row][col] = 0;
            shift = true;
            didShift = true;
          }
        }
      }
    }

    // Break from do...while() when loop has repeated
    if (repeated) {
      repeated = false;
      break;
    }

    // Match the values
    for (var row = 0; row < board.length; row++) {
      // Match each column by the value to the left
      for (var col = board.length - 1; col > -1; col--) {
        // Validate the previous column exists
        if (col - 1 === -1) {
          break;
        }

        // Do comparisons using [col - 1] for previous element
        if (board[row][col - 1] === board[row][col] && board[row][col] !== 0) {
          board[row][col] = board[row][col] * 2;
          board[row][col - 1] = 0;
          matchedTiles.push([row, col]);
          didShift = true;
        }
      }
    }

    // Repeat run when fully executed
    repeated = true;
  } while (repeated); // End while() when broken prematurely

  // Return whether or not a successful match has been made
  return { tiles: matchedTiles, didShift };
};

export const generateTile = board => {
  //Loop throught the board and record all blank tiles and their positions
  var blanks = [];
  board.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile === 0) blanks.push([i, j]);
    });
  });

  //Grab a random value from the blanks array
  var randomValue = getRandomInt(0, blanks.length - 1);

  //Set the blank tile in the position corresponding to that random value equal to either 2 or a 4
  board[blanks[randomValue][0]][blanks[randomValue][1]] = probability(0.5)
    ? 2
    : 4;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var probability = function (n) {
  return !!n && Math.random() <= n;
};