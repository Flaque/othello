let grid = require('./grid.js')
import * as consts from '../constants'


test('grid can create a proper empty array', () => {
  let board = grid.createEmpty()

  // Check board is 8 by 8
  expect(board.length).toBe(8)
  expect(board[0].length).toBe(8)

  expect(board[4][2].x).toBe(4)
  expect(board[4][2].y).toBe(2)
})

test('grid can add a piece to itself', () => {
  let board = grid.createEmpty()

  // We can add a black piece
  grid.setCell(board, 0, 2, grid.BLACK_FORMAT)
  expect(board[0][2].player).toBe(consts.PLAYERS.BLACK)

  // We can add a white piece
  grid.setCell(board, 2, 4, grid.WHITE_FORMAT)
  expect(board[2][4].player).toBe(consts.PLAYERS.WHITE)

  // We can add an empty piece
  grid.setCell(board, 1, 1, grid.EMPTY_FORMAT)
  expect(board[1][1].player).toBe(consts.PLAYERS.EMPTY)
})
