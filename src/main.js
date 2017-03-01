import $ from "jquery"
import "flexboxgrid/css/flexboxgrid.min.css"
import "./styles.css"
import Board from "./board/board.js"
import Label from "./label/label.js"

const board = new Board(8, 8)
const label = new Label()

function setup() {
  board.insertIntoElement("#board-container .board-wrapper")
  board.bindClickEvents()
}

setup()
