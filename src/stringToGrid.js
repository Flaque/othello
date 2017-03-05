/**
 * A testing utility to try out different board setups
 */

import * as consts from './constants'

const activeWhite = {
 player: consts.PLAYERS.WHITE,
 active: true
}

const activeBlack = {
 player: consts.PLAYERS.BLACK,
 active: true
}

const empty = {
 player: consts.PLAYERS.EMPTY,
 active: false
}

function getEmpty(x, y) {
  return Object.assign({}, empty, {x, y})
}

function getWhite(x, y) {
  return Object.assign({}, activeWhite, {x, y})
}

function getBlack(x, y) {
  return Object.assign({}, activeBlack, {x, y})
}

export default function(string) {
  string = string.trim()
  let rows = []
  let lines = string.match(/[^\r\n]+/g)
  for (let [index, line] of lines.entries()) {
    let chars = line.split("")
    let cols = chars.reduce((prevs, i) => {
      let [x, y] = [prevs.length, index]

      if (i === "*") { prevs.push(getEmpty(x,y)); return prevs }
      if (i === "b") { prevs.push(getBlack(x,y)); return prevs }
      if (i === "w") { prevs.push(getWhite(x,y)); return prevs }
      else return prevs
    }, [])
    rows.push(cols)
  }
  return rows
}
