import $ from "jquery"
import board_html from './board_html.js'

export default class {

  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
  }

  build(container) {
    this.$el = $(container)
    this.$el.html(board_html(this.rows, this.columns))
    return this
  }
}
