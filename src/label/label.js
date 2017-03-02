import $ from "jquery"
import {getGlobals, triggerGlobalEvent, events} from '../globals.js'

export default class {
  constructor() {
    this.$el = $("#labels")

    // This allows us to use "this" when this is called from the
    // trigger event
    this.setWhosTurnLabel = this.setWhosTurnLabel.bind(this)
    this.setScoreLabel = this.setScoreLabel.bind(this)


    // Bind to global update
    $(document).on(events.TOGGLE_BLACKS_TURN, this.setWhosTurnLabel)
    $(document).on(events.INCREMENT_BLACK_SCORE, this.setScoreLabel)
    $(document).on(events.INCREMENT_WHITE_SCORE, this.setScoreLabel)
    $(document).on(events.FLIP_TILE, this.setScoreLabel)

  }

  /**
   * Sets who's turn label to "Black" or "White"
   */
  setWhosTurnLabel() {
    if (getGlobals().isBlacksTurn) {
      this.$el.find(".whos-turn").text("Black")
    } else {
      this.$el.find(".whos-turn").text("White")
    }
  }

  /**
   * Set the Score label
   */
  setScoreLabel() {
    this.$el.find(".white-label").text(getGlobals().whiteScore)
    this.$el.find(".black-label").text(getGlobals().blackScore)
  }
}
