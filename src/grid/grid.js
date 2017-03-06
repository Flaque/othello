/**
 * Grid
 */

import * as consts from '../constants'
import _ from 'lodash'

export const EMPTY_FORMAT = {
  player: consts.PLAYERS.EMPTY,
  active: false,
}

export const BLACK_FORMAT = {
  player: consts.PLAYERS.BLACK,
  active: true,
}

export const WHITE_FORMAT = {
  player: consts.PLAYERS.WHITE,
  active: true,
}

function opposite(color) {
  if (color === consts.PLAYERS.WHITE) return consts.PLAYERS.BLACK
  if (color === consts.PLAYERS.BLACK) return consts.PLAYERS.WHITE
  else return color
}

/**
 * Makes a cell with cords at x, y with format
 */
function makeCell(x, y, format) {
  return Object.assign({x, y}, format)
}

/**
 * Sets a cell to be a certain format
 *
 * Use formats that are supplied by grid
 * example:
 *
 * setCell(board, 0, 2, grid.BLACK_FORMAT)
 * will set 0, 2 to be black
 */
export function setCell(grid, x, y, format) {
  grid[x][y] = Object.assign(grid[x][y], format)
}

/**
 * Creates an empty grid that is indexable
 */
export function createEmpty() {

  let rows = []
  for (let x = 0; x < consts.WIDTH; x++) {
    let row = []
    for (let y = 0; y < consts.HEIGHT; y++) {
      row.push(makeCell(x, y, EMPTY_FORMAT))
    }
    rows.push(row)
  }

  return rows
}

export function activateAvailableCells(grid, paths, turn) {
  for (let path of paths) {
    let {x, y} = _.last(path)
    if (consts.PLAYERS.WHITE === turn) grid[x][y].isWhiteAvailable = true
    else grid[x][y].isBlackAvailable = true
  }
}

export function flipCells(grid, paths) {
  for (let {x, y} of paths) {
    grid[x][y].player = opposite(grid[x][y].player)
  }
}
