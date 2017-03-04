import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'
import {getSides} from './grid_utils.js'

const PLAYERS = {
  BLACK: "black",
  WHITE: "white",
  EMPTY: "empty"
}

const WIDTH = 8
const HEIGHT = 8

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
  setPieceInState(state, 2, 3, PLAYERS.WHITE)
  setPieceInState(state, 2, 4, PLAYERS.BLACK)
  setPieceInState(state, 3, 3, PLAYERS.BLACK)
  setPieceInState(state, 3, 4, PLAYERS.WHITE)
}

/**
 * Creates an intial, default board state
 */
function createBoardState() {

  let state = []
  for (let x = 0; x < WIDTH; x++) {
    let row = []
    for (let y = 0; y < HEIGHT; y++) {
      row.push({
        player: PLAYERS.EMPTY,
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
  if (turn === PLAYERS.WHITE && col.isWhiteAvailable) {
    return true
  } else if (turn === PLAYERS.BLACK && col.isBlackAvailable) {
    return true
  }

  return false
}

/**
 * Launch our board
 * @type {Vue}
 */
var app = new Vue({
  el: '#board-container',
  data: {
    rows: createBoardState(),
    turn: 'black',
    blackScore: 0,
    whiteScore: 0
  },
  methods: {

    /**
     * Places a piece. Woopdy doodah
     */
    placePiece: function(col, event) {
      if (col.player != PLAYERS.EMPTY) {
        return // Don't do anything on a filled cell
      }

      col.active = true
      col.player = this.turn

      // Mark some things as available
      let sides = getSides(col.x, col.y, 8, 8)
      for (let key in sides) {
        if (this.turn === PLAYERS.WHITE) {
          this.rows[sides[key][0]][sides[key][1]].isWhiteAvailable = true
        } else {
          this.rows[sides[key][0]][sides[key][1]].isBlackAvailable = true
        }
      }

      // Update turn and score
      if (this.turn === PLAYERS.WHITE) {
        this.turn = PLAYERS.BLACK
        this.whiteScore++
      } else {
        this.turn = PLAYERS.WHITE
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
