import * as consts from './constants'


function getOppositePiece(grid, x, y) {
  return (grid[x][y].player === consts.PLAYERS.WHITE)
    ? consts.PLAYERS.BLACK
    : consts.PLAYERS.WHITE
}

function isEmpty(grid, x, y) {
  return grid[x][y].player === consts.PLAYERS.EMPTY
}

function searchDown(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let hasMiddlePiece = false

  for (let i = y; i < consts.HEIGHT; i++) {
    if (isEmpty(grid, x, i)) {
      if (hasMiddlePiece) return {x, y: i} //Found an empty slot!
      else return false
    } else if (grid[x][i].player === oppositePiece) {
      hasMiddlePiece = true
    }
  }

  return false
}

function searchUp(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let hasMiddlePiece = false

  for (let i = y; i > 0; i--) {
    if (isEmpty(grid, x, i)) {
      if (hasMiddlePiece) return {x, y: i} //Found an empty slot!
      else return false
    } else if (grid[x][i].player === oppositePiece) {
      hasMiddlePiece = true
    }
  }

  return false
}

function searchLeft(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let hasMiddlePiece = false

  for (let i = x; i > 0; i--) {
    if (isEmpty(grid, i, y)) {
      if (hasMiddlePiece) return {x: i, y} //Found an empty slot!
      else return false
    } else if (grid[i][y].player === oppositePiece) {
      hasMiddlePiece = true
    }
  }

  return false
}

function searchRight(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let hasMiddlePiece = false

  for (let i = x; i < consts.WIDTH; i++) {
    if (isEmpty(grid, i, y)) {
      if (hasMiddlePiece) return {x: i, y} //Found an empty slot!
      else return false
    } else if (grid[i][y].player === oppositePiece) {
      hasMiddlePiece = true
    }
  }

  return false
}


/**
 * Gets all valid Othello moves from
 * a specific piece. Basically just the ones
 * that are across from the piece.
 */
export function acrossFrom(grid, x, y) {
  let possiblePoints = [
    searchUp(grid, x, y),
    searchDown(grid, x, y),
    searchLeft(grid, x, y),
    searchRight(grid, x, y)
  ]

  return possiblePoints.filter(point => point != false)
}
