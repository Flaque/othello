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

  return state
}

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

      // Update turn and score
      if (this.turn === PLAYERS.WHITE) {
        this.turn = PLAYERS.BLACK
        this.whiteScore++
      } else {
        this.turn = PLAYERS.WHITE
        this.blackScore++
      }

      // Mark some things as available
      let sides = getSides(col.x, col.y, 8, 8)
      for (let key in sides) {
        this.rows[sides[key][0]][sides[key][1]].isWhiteAvailable = true
        this.rows[sides[key][0]][sides[key][1]].isBlackAvailable = true
      }
    },

    /**
     * Get the class for the square div
     */
    squareClass: function(col) {
      let isAvailable = false
      if (this.turn === PLAYERS.WHITE && col.isWhiteAvailable) {
        isAvailable = true
      } else if (this.turn === PLAYERS.BLACK && col.isBlackAvailable) {
        isAvailable = true
      }

      return {
        'available' : isAvailable
      }
    }
  },
})
