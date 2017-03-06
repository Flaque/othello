import * as consts from '../constants'
import _ from 'lodash'
let utils = require('./utils.js')


/**
 * Define a bunch of path arrays
 */

export const up = (x, y) => _.range(y+1, consts.HEIGHT)
  .map((y) => { return {x, y} })

export const down = (x, y) => _.rangeRight(y)
  .map((y) => { return {x, y} })

export const right = (x, y) => _.range(x+1, consts.WIDTH)
  .map((x) => { return {x, y} })

export const left = (x, y) => _.rangeRight(x)
  .map((x) => { return {x, y} })

function containsOpposite(grid, path, color) {
  for (let {x, y} of path) {
    if (grid[x][y].player === consts.PLAYERS.EMPTY) continue
    if (grid[x][y].player != color) return true
  }
  return false
}

/**
 * Standardizes a path and checks if it truly exists.
 * If it does, the last element will be an empty cell.
 * otherwise, it will return false
 */
export function confirmPath(grid, path, color) {

  // Check the path for inconsistencies
  let badPath = false
  let emptyCell = {}
  let trimmedPath = _.takeWhile(path, ({x, y}) => {

    // If it finds an empty path
    if (grid[x][y].player === consts.PLAYERS.EMPTY) {
      emptyCell = {x, y}
      return false
    }

    // If it encounters the same color
    if (grid[x][y].player === color) {
      badPath = true
      return false
    }

    return true
  })

  trimmedPath.push(emptyCell) //Add the empty cell to the end of our path

  // Either return the path or false if something went wrong
  if (badPath) return false
  if (trimmedPath.length === 0 || _.isEmpty(trimmedPath[0]))
    return false
  if (!containsOpposite(grid, trimmedPath, color)) return false
  return trimmedPath
}

/**
 * Gets a all the paths available to a point.
 */
export function getPaths(grid, x, y) {

  let color = grid[x][y].player
  let ps = [
    confirmPath(grid, up(x,y), color),
    confirmPath(grid, down(x,y), color),
    confirmPath(grid, right(x,y), color),
    confirmPath(grid, left(x,y), color)
  ]

  return ps.filter(point => point != false)
}