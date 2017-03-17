import * as consts from '../constants'
import _ from 'lodash'
let utils = require('./utils.js')


/**
 * Helper function to combine xs and ys from ranges for path functions
 */
function combineXsYs(xs, ys) {
  let array = _.zip(xs, ys) // Combine into [[x, y], [x, y], ...] pairs
    .map(([x, y]) => { return {x, y} }) // Make objects [{x: 2, y: 3}, ...]

  // Kill any odd ones out (since we can wind up with {x: 7, y: undefined})
  return _.dropRightWhile(array, ({x, y}) => {
    return x === undefined || y === undefined
  })
}

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

export const upRight = (x, y) => {
  const xs = _.range(x+1, consts.WIDTH)
  const ys = _.range(y+1, consts.HEIGHT)
  return combineXsYs(xs, ys)
}

export const upLeft = (x, y) => {
  const xs = _.rangeRight(x)
  const ys = _.range(y+1, consts.HEIGHT)
  return combineXsYs(xs, ys)
}

export const downLeft = (x, y) => {
  const xs = _.rangeRight(x)
  const ys = _.rangeRight(y)
  return combineXsYs(xs, ys)
}

export const downRight = (x, y) => {
  const xs = _.range(x+1, consts.WIDTH)
  const ys = _.rangeRight(y)
  return combineXsYs(xs, ys)
}

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

export function getAvailable(grid, path, color) {

  let foundOpposite = false

  for (let {x, y} of path) {
    if (grid[x][y].player === consts.PLAYERS.EMPTY) {
      return (foundOpposite) ? {x, y} : false
    }
    if (grid[x][y].player === color) return false
    if (grid[x][y].player !== color) foundOpposite = true
  }

  return false
}

/**
 * Gets the indices of items that should be flipped
 */
export function getFlipPath(grid, path, color) {
  let subpath = []

  for (let {x, y} of path) {
    if (grid[x][y].player === consts.PLAYERS.EMPTY) return subpath
    if (grid[x][y].player === color) return subpath
    if (grid[x][y].player !== color) subpath.push({x, y})
  }

  return subpath
}

/**
 * Helper function to apply a function to all the paths.
 */
function getPathsWith(grid, x, y, color, func) {
  return [
    func(grid, up(x,y), color),
    func(grid, down(x,y), color),
    func(grid, right(x,y), color),
    func(grid, left(x,y), color),

    func(grid, upRight(x, y), color),
    func(grid, upLeft(x, y), color),
    func(grid, downRight(x, y), color),
    func(grid, downLeft(x, y), color),
  ]
}

/**
 * Gets a all the paths available to a point.
 */
export function getPaths(grid, x, y) {
  let color = grid[x][y].player
  let routes = getPathsWith(grid, x, y, color, getAvailable)

  return routes.filter(point => point != false)
}

export function getFlipPaths(grid, x, y) {
  let color = grid[x][y].player
  let routes = getPathsWith(grid, x, y, color, getFlipPath)

  return routes.filter(path => path.length >= 1)
}
