let grid = require('./grid.js')

export function gridFromString(string) {
  let board = grid.createEmpty()

  // Remove all whitespaces from the string
  string = string.trim().replace(/ /g,'')
  let lines = string.split('\n')

  // Parse string and apply formats
  for (let [y, line] of lines.reverse().entries()) {
    for (let [x, c] of line.split("").entries()) {
      if (c === 'b')
        grid.setCell(board, x, y, grid.BLACK_FORMAT)
      else if (c === 'w')
        grid.setCell(board, x, y, grid.WHITE_FORMAT)
    }
  }


  return board
}
