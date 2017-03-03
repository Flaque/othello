import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Vue from './vendor/vue.js'

const PLAYERS = {
  BLACK: "black",
  WHITE: "white",
  EMPTY: "empty"
}

const WIDTH = 8
const HEIGHT = 8

function createBoardState() {
  return Array.from({length: HEIGHT}, () => {
    return Array.from({length: WIDTH}, () => {
      return {
        player: PLAYERS.EMPTY,
        active: false,
        isWhiteAvailable: true,
        isBlackAvailable: true
      }
    })
  })
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
    placePiece: function(col, event) {
      if (col.player != PLAYERS.EMPTY) {
        return // Don't do anything on a filled cell
      }

      col.active = true
      col.player = this.turn

      if (this.turn === PLAYERS.WHITE) {
        this.turn = PLAYERS.BLACK
        this.whiteScore++
      } else {
        this.turn = PLAYERS.WHITE
        this.blackScore++
      }
    }
  }
})
