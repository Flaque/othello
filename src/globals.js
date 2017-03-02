/**
 * Globals are a bad thing, so lets at least keep track of them.
 * The only global actions that are allowed will be allowed by
 * calling events that trigger them.
 */

import $ from "jquery"

/**
 * Global defaults
 */
window.globals = {
  isBlacksTurn: true,
  blackScore: 0,
  whiteScore: 0
}

/**
 * General getter for globals
 */
function getGlobals() {
  // Returns a copy so original globals can't be modified
  const globalsCopy = JSON.parse(JSON.stringify(window.globals))
  return globalsCopy
}

/**
 * Triggers a global event which will make a change to the globals
 */
function triggerGlobalEvent(event, data) {
  $(document).trigger(event, data)
}

/**
 * Event names
 */
const events = {
  TOGGLE_BLACKS_TURN : "TOGGLE_BLACKS_TURN",
  INCREMENT_BLACK_SCORE : "INCREMENT_BLACK_SCORE",
  INCREMENT_WHITE_SCORE : "INCREMENT_WHITE_SCORE",
  FLIP_TILE : "FLIP_TILE"
}

/**
 * Event definitions
 */
$(document).on(events.TOGGLE_BLACKS_TURN, function() {
  window.globals.isBlacksTurn = !window.globals.isBlacksTurn
  console.info(events.TOGGLE_BLACKS_TURN)
})

$(document).on(events.INCREMENT_BLACK_SCORE, function() {
  window.globals.blackScore++
})

$(document).on(events.INCREMENT_WHITE_SCORE, function() {
  window.globals.whiteScore++
})

$(document).on(events.FLIP_TILE, function(data) {
  console.log(data)
})

export {events, getGlobals, triggerGlobalEvent}
