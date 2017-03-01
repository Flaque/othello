import $ from "jquery"
import {getGlobals, triggerGlobalEvent, events} from '../globals.js'

export default class {
  constructor() {
    this.$el = $("#labels")

    // This allows us to use "this" when update is called from the
    // trigger event
    this.update = this.update.bind(this)

    // Bind to global update
    $(document).on(events.UPDATE, this.update)
  }

  /**
   * Update the label's view data
   */
  update() {
    this.setWhosTurnLabel()
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
}
