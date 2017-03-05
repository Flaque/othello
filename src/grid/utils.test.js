const utils = require('./utils')
import * as consts from '../constants'


test("can create a grid from a string", () => {
  let board = utils.gridFromString(`
    ********
    ********
    ********
    ********
    ********
    ********
    ********
    bw******
    `)

  // board lengt
  expect(board.length).toBe(8)
  expect(board[0].length).toBe(8)

  // Check our items are there
  expect(board[0][0].player).toBe(consts.PLAYERS.BLACK)
  expect(board[1][0].player).toBe(consts.PLAYERS.WHITE)
})
