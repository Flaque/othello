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
  let path = []

  for (let i = y; i < consts.HEIGHT; i++) {
    if (isEmpty(grid, x, i)) {
      if (path.length > 0) {
        path.push({x, y: i})
        return path //Found an empty slot!
      }
      else return false
    } else if (grid[x][i].player === oppositePiece) {
      path.push({x, y: i})
    }
  }

  return false
}

function searchUp(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let path = []

  for (let i = y; i > 0; i--) {
    if (isEmpty(grid, x, i)) {
      if (path.length > 0) {
        path.push({x, y: i})
        return path //Found an empty slot!
      }
      else return false
    } else if (grid[x][i].player === oppositePiece) {
      path.push({x, y: i})
    }
  }

  return false
}

function searchLeft(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let path = []

  for (let i = x; i > 0; i--) {
    if (isEmpty(grid, i, y)) {
      if (path.length > 0) {
        path.push({x: i, y})
        return path //Found an empty slot!
      }
      else return false
    } else if (grid[i][y].player === oppositePiece) {
      path.push({x: i, y})
    }
  }

  return false
}

function searchRight(grid, x, y) {
  let oppositePiece = getOppositePiece(grid, x, y)
  let path = []

  for (let i = x; i < consts.WIDTH; i++) {
    if (isEmpty(grid, i, y)) {
      if (path.length > 0) {
        path.push({x: i, y})
        return path //Found an empty slot!
      }
      else return false
    } else if (grid[i][y].player === oppositePiece) {
      path.push({x: i, y})
    }
  }

  return false
}


/**
 * Gets all valid Othello moves from
 * a specific piece. Basically just the ones
 * that are across from the piece.
 */
export function pathFrom(grid, x, y) {
  let possiblePoints = [
    searchUp(grid, x, y),
    searchDown(grid, x, y),
    searchLeft(grid, x, y),
    searchRight(grid, x, y)
  ]

  return possiblePoints.filter(point => point != false)
}
