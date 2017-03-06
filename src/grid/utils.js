let grid = require('./grid.js')
import * as consts from '../constants'


/**
 * Creates a grid from a string like this:
 * ```
     ********
     ********
     ********
     ********
     ********
     ********
     ********
     bw******
 * ```
 *
 * Where b is black, w is white and * is an empty space
 */
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

export function isEdge(x, y) {
  return x === 0 || x === consts.WIDTH-1 || y === 0 || y === consts.HEIGHT-1
}
