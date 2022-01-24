export const up = board => {
  var matchedTiles = [];
  var didShift = false;

  // Return whether or not a successful match has been made
  return { tiles: matchedTiles, didShift };
};
export const down = board => {
  var matchedTiles = [];
  var didShift = false;

  // Return whether or not a successful match has been made
  return { tiles: matchedTiles, didShift };
  //down comment
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
  var didShift = false;

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
  //Loop through the board and record all blank tiles and their positions
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

  return [blanks[randomValue][0], blanks[randomValue][1]];
};

export const validateBoard = board => {
  // Assume user can't move
  var safe = false;

  // Loop through each index of the board and check if a match can be made
  var value = 0;
  for (var row = 0; !safe && (row < board.length); row++) {
    for (var col = 0; !safe && (col < board[row].length); col++) {
      // Set the current value
      value = board[row][col];

      // Check if the current value is 0 (can still move)
      safe = (value === 0);
      if (safe) {
        break;
      }

      // Check the "above" row
      if (row - 1 !== -1) {
        safe = safe || (board[row - 1][col] === value);
      }

      // Check the "below" row
      if (row + 1 !== board.length) {
        safe = safe || (board[row + 1][col] === value);
      }

      // Check the "left" column
      if (col - 1 !== -1) {
        safe = safe || (board[row][col - 1] === value);
      }

      // Check the "right" column
      if (col + 1 !== board[row].length) {
        safe = safe || (board[row][col + 1] === value);
      }
    }
  }

  return safe;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate # between 0 and 1, check less than given integer or 0.5
var probability = function (n) {
  return Math.random() <= parseFloat(n || 0.5);
};
