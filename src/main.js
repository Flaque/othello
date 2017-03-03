import $ from "jquery"
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
    turn: 'black'
  },
  methods: {
    placePiece: function(col, event) {
      col.active = true
      col.player = this.turn
      this.turn = (this.turn === PLAYERS.WHITE)
        ? PLAYERS.BLACK
        : PLAYERS.WHITE
    }
  }
})
