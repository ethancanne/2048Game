export const up = board => {
  console.log("up");
  var match = false;
  return match;
};
export const down = board => {
  console.log("down");
  var match = false;
  return match;
};
export const left = board => {
  console.log("left");
  var match = false;
  return match;
};

/***********************
 * Shift values to right
 * Match values
 * Shift values to right
 **********************/

export const right = board => {
  // Declare variables
  var shift = false;
  var match = false;
  var first = true;
  do {
    // Run through each available row
    for (var row = 0; row < board.length; row++) {
      // Shift the avilable values to the right
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
          }
        }
      }
    }

    // Break from do...while() if this is the second shifting attempt
    if (!first) {
      first = true;
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
        if (board[row][col - 1] === board[row][col]) {
          board[row][col] = board[row][col] * 2;
          board[row][col - 1] = 0;
          match = true;
        }
      }
    }

    // First run is now over
    first = false;
  } while (!first); // End while() when broken prematurely

  // Return whether or not a successful match has been made
  return match;
};
export const generateTile = board => {};
