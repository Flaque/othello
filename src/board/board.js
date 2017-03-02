import $ from "jquery"
import board_html from './board_html.js'
import * as colors from './colors'
import {getGlobals, triggerGlobalEvent, events} from '../globals.js'

/**
 * Private Function
 * Returns a jQuery element of the square at x and y.
 */
function _$getSquare(x, y) {
  return $(`.square[data-x="${x}"][data-y="${y}"]`)
}

/**
 * Private Function
 * Returns true if the color is black or white.
 */
function _isBlackOrWhite(color) {
  return (color === colors.WHITE || color === colors.BLACK)
}

/**
 * Private Function
 * Returns true if the x and y position is outside the board.
 */
function _isOutsideBoard(x, y, board) {
  return x >= board.rows || x < 0 || y >= board.columns || y < 0
}

/**
 * Private Function
 * Colors a circle with the correct color.
 */
function _colorCircle($circle, color) {
  if (color === colors.WHITE) $circle.addClass("white").removeClass("black")
  else                        $circle.addClass("black").removeClass("white")
  return $circle
}

/**
 * Private Function
 * Colors and activates the square piece in the HTML.
 */
function _placePieceInHTML(x, y, color) {
  let $circle = _$getSquare(x, y).find(".circle")
  _colorCircle($circle, color).addClass("active")
}

/**
 * Private Function
 * Sets the square to be owned by either "white" or "black".
 */
function _setSquareState(x, y, color, board) {
  board.state[x][y] = color
}

/**
 * Private Function
 * Creates an empty 2d array of states using Array.from
 * Docs on Array.from: https://tinyurl.com/kynnskn
 */
function _emptyStateArray(rows, columns) {
  return Array.from({ length: columns }, () => {
    return Array.from({ length: rows}, () => colors.EMPTY )
  })
}

/**
 * Sends an event that Increments Blacks Score
 */
function _addBlackTileScore() {
  triggerGlobalEvent(events.INCREMENT_BLACK_SCORE)
}

/**
 * Sends an event that Increments Whites Score
 */
function _addWhiteTileScore() {
  triggerGlobalEvent(events.INCREMENT_WHITE_SCORE)
}

/**
 * Sends an event that Increments Blacks Score and decrements
 * whites score if blackTileWasGained, otherwise does the
 * opposite.
 */
function _flipTileScore(blackTileWasGained) {
  triggerGlobalEvent(events.FLIP_TILE, blackTileWasGained)
}

/**
 * Publicly exported class
 */
export default class {

  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.state = _emptyStateArray(rows, columns)
  }

  /**
   * Inserts the board HTML into the container element.
   */
  insertIntoElement(container) {
    this.$el = $(container)
    this.$el.html(board_html(this.rows, this.columns))
    return this
  }

  bindClickEvents() {

    // Check that the element still exists
    if (!this.$el || this.$el.length <= 0) {
      throw `You cant bind an element that has not been inserted into the HTML`
    }

    var board = this
    this.$el.find('.square').click(function() {
      let x = $(this).data("x")
      let y = $(this).data("y")

      // Place piece
      if (getGlobals().isBlacksTurn) board.placePiece(x, y, colors.BLACK)
      else board.placePiece(x, y, colors.WHITE)

      // Change turn globally
      triggerGlobalEvent(events.TOGGLE_BLACKS_TURN)
    })
  }

  /**
   * Places a piece on the board.
   * State and view is kept in sync.
   */
  placePiece(x, y, color) {

    // Check that the color
    if (!_isBlackOrWhite(color)) {
      throw "The color of a piece must be either black or white."
    }

    // Check that the piece is placed on the board.
    if ( _isOutsideBoard(x, y, this) ) {
      throw "A piece must be placed on the board"
    }

    if (color === colors.BLACK) {
      _addBlackTileScore()
    } else {
      _addWhiteTileScore()
    }

    // Update view and state
    _placePieceInHTML(x, y, color)
    _setSquareState(x, y, color, this)

    return this
  }
}
