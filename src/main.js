import $ from "jquery"
import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"

import Board from "./board/board.js"

const board = new Board(8, 8)

function setup() {
  board.build("#board-container")
}

setup()
