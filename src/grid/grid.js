/**
 * Grid
 */
 
import * as consts from '../constants'
import _ from 'lodash'
let paths = require('./paths.js')

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

export function opposite(color) {
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
  for (let {x, y} of paths) {
    if (consts.PLAYERS.WHITE === turn) grid[x][y].isWhiteAvailable = true
    else grid[x][y].isBlackAvailable = true
  }
}

export function flipCells(grid, paths, color) {
  wipeHighlighted(grid)
  for (let path of paths) {
    for (let {x, y} of path) {
      grid[x][y].player = color
      grid[x][y].highlighted = true
    }
  }
}

export function wipeHighlighted(grid) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      grid[x][y].highlighted = false
    }
  }
}

export function countColors(grid) {
  let black = 0
  let white = 0
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y].player === consts.PLAYERS.BLACK) black++;
      if (grid[x][y].player === consts.PLAYERS.WHITE) white++;
    }
  }

  return {black, white}
}

function wipeAvailable(grid) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      grid[x][y].isWhiteAvailable = false
      grid[x][y].isBlackAvailable = false
    }
  }
}

export function getAvailable(grid, color) {
  let availables = []
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (color === consts.PLAYERS.BLACK && grid[x][y].isBlackAvailable) {
        availables.push(grid[x][y])
      } else if (color === consts.PLAYERS.WHITE && grid[x][y].isWhiteAvailable){
        availables.push(grid[x][y])
      }
    }
  }
  return availables
}

export function isFull(grid) {
  const blackCells = getAvailable(grid, consts.PLAYERS.BLACK)
  const whiteCells = getAvailable(grid, consts.PLAYERS.WHITE)
  if (blackCells.length === 0 && whiteCells.length === 0) return true
  return false
}

export function updateAvailable(grid) {
  wipeAvailable(grid)

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {

      // Don't update empty cells
      if (grid[x][y].player === consts.PLAYERS.EMPTY) continue

      let routes = paths.getPaths(grid, x, y)
      activateAvailableCells(grid, routes, grid[x][y].player)
    }
  }
}

export function updateFlips(grid, x, y) {
  let color = grid[x][y].player
  let routes = paths.getFlipPaths(grid, x, y)
  flipCells(grid, routes, color)
}
