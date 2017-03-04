import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'
import {getSides} from './grid_utils.js'
import {acrossFrom} from './acrossFrom.js'
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
  setPieceInState(state, 2, 3, consts.PLAYERS.WHITE)
  setPieceInState(state, 2, 4, consts.PLAYERS.BLACK)
  setPieceInState(state, 3, 3, consts.PLAYERS.BLACK)
  setPieceInState(state, 3, 4, consts.PLAYERS.WHITE)
  setAvailable(consts.PLAYERS.WHITE, state, 2, 3)
  setAvailable(consts.PLAYERS.BLACK, state, 2, 4)
  setAvailable(consts.PLAYERS.BLACK, state, 3, 3)
  setAvailable(consts.PLAYERS.WHITE, state, 3, 4)
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
  if (col.active) {
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

function setAvailable(turn, rows, x, y) {
  let items = acrossFrom(rows, x, y)

  for (let {x, y} of items) {
    if (turn === consts.PLAYERS.BLACK)
      rows[x][y].isBlackAvailable = true
    else
      rows[x][y].isWhiteAvailable = true
  }
  return rows
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

      col.active = true
      col.player = this.turn

      setAvailable(this.turn, this.rows, col.x, col.y)

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
