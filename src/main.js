import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'
import {getSides} from './grid_utils.js'
import {pathFrom} from './pathFrom.js'
import * as consts from './constants'

function setPieceInState(state, x, y, player) {
  state[x][y].player = player
  state[x][y].active = true
  return state
}

/**
 * Places the default pattern:
 *
 *   xo
 *   ox
 *
 */
function placeDefaultPieces(state) {

  let pieces = [
    {x: 2, y: 3, color: consts.PLAYERS.WHITE},
    {x: 2, y: 4, color: consts.PLAYERS.BLACK},
    {x: 3, y: 3, color: consts.PLAYERS.BLACK},
    {x: 3, y: 4, color: consts.PLAYERS.WHITE},
  ]

  // Sets a bunch of pieces on the board
  for (let {x, y, color} of pieces) {
    setPieceInState(state, x, y, color)
  }

  // Now check if those pieces have available points
  for (let {x, y, color} of pieces) {
    let items = pathFrom(state, x, y)
    setAvailable(color, state, items)
  }
}

/**
 * Creates an intial, default board state
 */
function createBoardState() {

  let state = []
  for (let x = 0; x < consts.WIDTH; x++) {
    let row = []
    for (let y = 0; y < consts.HEIGHT; y++) {
      row.push({
        player: consts.PLAYERS.EMPTY,
        active: false,
        isWhiteAvailable: false,
        isBlackAvailable: false,
        x: x,
        y: y
      })
    }
    state.push(row)
  }

  // Create Default game state
  placeDefaultPieces(state)

  return state
}

/**
 * Returns wether or not this square is available for the current
 * user to place a piece on
 */
function isAvailable(turn, col) {

  // If piece is taken, we can't place a piece here
  if (col.player != consts.PLAYERS.EMPTY) {
    return false
  }

  // If it is that players turn and this spot is avialable
  if (turn === consts.PLAYERS.WHITE && col.isWhiteAvailable) {
    return true
  } else if (turn === consts.PLAYERS.BLACK && col.isBlackAvailable) {
    return true
  }

  return false
}

/**
 * Sets a bunch of items to be available
 */
function setAvailable(turn, rows, items) {

  for (let path of items) {
    let {x, y} = path.slice(-1)[0] // Last item in the path is empty

    setSquareAvailable(turn, rows, x, y)
  }
}

/**
 * Sets a specific square available
 */
function setSquareAvailable(turn, rows, x, y) {
  if (turn === consts.PLAYERS.BLACK)
    rows[x][y].isBlackAvailable = true
  else
    rows[x][y].isWhiteAvailable = true
}

/**
 * Flips the squares along a path
 */
function flipSquares(self, path) {
  for (let {x, y} of path[0]) {
    self.rows[x][y].player = self.turn
  }

  for (let {x, y} of path[0]) {
    setSquareAvailable(self.turn, self.rows, x, y)
  }
}

/**
 * Launch our board
 * @type {Vue}
 */
var app = new Vue({
  el: '#board-container',
  data: {
    rows: createBoardState(),
    turn: consts.PLAYERS.BLACK,
    blackScore: 0,
    whiteScore: 0
  },
  methods: {

    /**
     * Places a piece. Woopdy doodah
     */
    placePiece: function(col, event) {
      if (col.player != consts.PLAYERS.EMPTY) {
        return // Don't do anything on a filled cell
      }

      col.player = this.turn
      col.active = true

      // Set newly available moves
      let path = pathFrom(this.rows, col.x, col.y)
      setAvailable(this.turn, this.rows, path)
      flipSquares(this, path)

      // Update turn and score
      if (this.turn === consts.PLAYERS.WHITE) {
        this.turn = consts.PLAYERS.BLACK
        this.whiteScore++
      } else {
        this.turn = consts.PLAYERS.WHITE
        this.blackScore++
      }
    },

    /**
     * Get the class for the square div
     */
    squareClass: function(col) {
      return {
        'available' : isAvailable(this.turn, col)
      }
    }
  },
})
