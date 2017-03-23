import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'
import * as consts from './constants'
let grid = require('./grid/grid.js')
let grid_utils = require('./grid/utils.js')
let paths = require('./grid/paths.js')

// Useful Aliases
const BLACK = consts.PLAYERS.BLACK
const WHITE = consts.PLAYERS.WHITE
const EMPTY = consts.PLAYERS.EMPTY

// Register components
import whoShouldGoFirst from './components/who-should-go-first.js'

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
  if (col.player != EMPTY) {
    return false
  }

  // If it is that players turn and this spot is avialable
  if (turn === WHITE && col.isWhiteAvailable) {
    return true
  } else if (turn === BLACK && col.isBlackAvailable) {
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
      if (col.player !== EMPTY) {
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
  if (turn === BLACK)
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
    blackScore: 2,
    whiteScore: 2,
    started: false,
    paused: false,
    weAreBlack: undefined,
    seconds: 10,
    timedOut: false,
    gameover: false,
    skippedTurn: false
  },

  created: function() {
    let self = this
    window.addEventListener('keyup', (event, thing) => {
      if (event.key === "Enter" && !this.isOurTurn) self.pickRandomMoveForThem()
    })
  },

  computed: {
    isOurTurn() {
      return ((this.turn === BLACK && this.weAreBlack) || (this.turn === WHITE &&
        !this.weAreBlack))
    }
  },
  methods: {

    reverse: function(values) {
      return values.slice().reverse()
    },

    toAlpha: function(value) {
      const letters = ['A','B','C','D','E','F','G','F']
      return letters[value]
    },

    /**
     * Places a piece. Woopdy doodah
     */
    placePiece: function(col) {
      if (col.player != EMPTY) {
        return // Don't do anything on a filled cell
      }

      if (!col.isBlackAvailable && !col.isWhiteAvailable) return
      if (this.turn === WHITE && !col.isWhiteAvailable) return
      if (this.turn === BLACK && !col.isBlackAvailable) return

      col.player = this.turn
      col.active = true

      grid.updateFlips(this.rows, col.x, col.y)
      grid.updateAvailable(this.rows)
      col.highlighted = true


      // Pause for the AI player ask our permission
      if (this.isOurTurn) {
        clearTimeout(this.timer)
        this.seconds = 10
        this.paused = true
      }

      // Update turn
      if (this.turn === WHITE) {
        this.turn = BLACK
      } else {
        this.turn = WHITE
      }

      // Update Score
      let {black, white} = grid.countColors(this.rows)
      this.blackScore = black
      this.whiteScore = white

      // Check for gameover
      if (grid.isFull(this.rows)) {
        this.gameover = true;
        this.paused = false;
        this.timedOut = false;
        this.skippedTurn = false;
        return
      }

      // Now lets start the timer for the next turn
      if (this.isOurTurn) this.tickTimer()
      if (grid.getAvailable(this.rows, this.turn).length <= 0) {
        this.skipTurn()
      }

    },

    /**
     * Get the class for the square div
     */
    squareClass: function(col) {
      return {
        'available' : isAvailable(this.turn, col)
      }
    },

    /**
     * Called when the player selects either their AI or our AI to go first.
     */
    handleSelectedPlayer: function(isOurTurn) {
      this.started = true
      this.weAreBlack = isOurTurn
      this.paused = !isOurTurn
      if (this.isOurTurn) { this.tickTimer() }
    },

    pickRandomMoveForThem: function() {
      if (this.isOurTurn) {
        throw "Can't pick a random move on our turn!"
        this.skipTurn()
      }

      let random = _.sample(grid.getAvailable(this.rows, this.turn))

      // AI can't make a move! (no available cells)
      if (!random) {
        this.skippedTurn = true
        return
      }

      this.placePiece(random)

      this.paused = false
    },

    skipTurn: function() {
      this.turn = grid.opposite(this.turn)
      this.skippedTurn = false
      if (!this.isOurTurn) { this.pickRandomMoveForThem() }
    },

    tickTimer: function(){
      if (!this.isOurTurn) {
        this.seconds = 10 // Reset timer
        clearTimeout(this.timer)
        return
      }

      this.seconds -= 1

      if (this.seconds <= 0) this.timedOut = true
      else this.timer = setTimeout(this.tickTimer, 1000)
    }
  },
})
