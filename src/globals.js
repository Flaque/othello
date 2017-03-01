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
  isBlacksTurn: true
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
 * Triggers a global update to let all the views know that
 * they should change.
 */
function _triggerUpdate() {
  triggerGlobalEvent(events.UPDATE)
}

/**
 * Event names
 */
const events = {
  TOGGLE_BLACKS_TURN : "TOGGLE_BLACKS_TURN",
  UPDATE: "UPDATE"
}

/**
 * Event definitions
 */
$(document).on(events.TOGGLE_BLACKS_TURN, function() {
  window.globals.isBlacksTurn = !window.globals.isBlacksTurn
  console.info(events.TOGGLE_BLACKS_TURN)
  _triggerUpdate()
})

export {events, getGlobals, triggerGlobalEvent}
