import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'
import * as consts from './constants'
let grid = require('./grid/grid.js')
let grid_utils = require('./grid/utils.js')
let paths = require('./grid/paths.js')

function setPieceInState(state, x, y, player) {
  state[x][y].player = player
  state[x][y].active = true
  return state
}

/**
 * Creates an intial, default board state
 */
function createBoardState() {

  let state = grid_utils.gridFromString(`
    ********
    ********
    ********
    ***wb***
    ***bw***
    ********
    ********
    ********
    `)

  grid.updateAvailable(state)

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

function setAllAvailable(rows) {
  for (let row of rows) {
    for (let col of row) {
      if (col.player !== consts.PLAYERS.EMPTY) {
        let paths = pathFrom(rows, col.x, col.y)
        setAvailable(col.player, rows, paths)
      }
    }
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

    reverse: function(values) {
      return values.slice().reverse()
    },

    /**
     * Places a piece. Woopdy doodah
     */
    placePiece: function(col, event) {
      if (col.player != consts.PLAYERS.EMPTY) {
        return // Don't do anything on a filled cell
      }

      col.player = this.turn
      col.active = true

      // Flip cells
      console.log(this.rows, col.x, col.y)
      let routes = paths.getPaths(this.rows, col.x, col.y)
      grid.flipCells(this.rows, routes)

      // Update the available cells
      grid.updateAvailable(this.rows)

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
