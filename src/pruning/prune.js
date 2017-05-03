import _ from 'lodash'
import {updateAvailable, getAvailable, setCell,  BLACK_FORMAT, WHITE_FORMAT, countColors} from '../grid/grid.js'
import {gridFromString} from '../grid/utils.js'

function join(array) {
  return Object.assign({}, ...array)
}

/**
 * Returns true if item is a string
 */
function isString(item) { return typeof item === "string" }

/**
 * Finds the min and prints the path
 */
function ABPruning(graph) {
  let head = ""

  for (let node of Object.keys(graph)) {
    if (!graph[node][0]) head = node
  }

  let val = prune(head, graph)
  let cost = val[0]

  let path = val[1]
  path.reverse()

  return {cost, path}
}

function prune(node, graph) {
  let values = []
  let visited = []

  for (let child of graph[node][1]) {
    if (isString(child)) {
      let val = prune(child, graph)
      values.push(val[0])
      visited.push(val[1])
    } else {
      values.push(child)
      visited.push([])
    }
  }

  let indexOfVal = 0
  if (graph[node][3] === "Max") {
    indexOfVal = values.indexOf(_.max(values))
  } else {
    indexOfVal = values.indexOf(_.min(values))
  }

  visited = visited[indexOfVal]
  visited.push(node)
  return [values[indexOfVal], visited]
}

function getMoves(board, current_move) {
  updateAvailable(board)
  return getAvailable(board, current_move)
}

function cordToString(point) {
  return point.x.toString() + ',' + point.y.toString()
}

function getChildMoves(board, current_move) {
  let moves = getMoves(board, current_move)

  let keys = moves.map(function({x, y}) {
      return cordToString({x,y})
  })

  return {moves, keys}
}

function createUndefinedItems(keys) {
  return join(keys.map(function(node) {
    return {
      [node] : undefined
    }
  }))
}


//
// let graph = {"C":[undefined, ["A","D","E"], undefined, "Max"],
//              "A":["C", ["P","B"], undefined, "Min"],
//              "D": ["C", ["R",42], undefined, "Min"],
//              "E":["C", ["R","V"], undefined, "Min"],
//              "P":["A", [2,3], undefined, "Max"],
//              "B": ["A", [5,100], undefined, "Max"],
//              "R": ["D", [0], undefined, "Max"],
//              "T": ["E", [2,1], undefined, "Max"],
//              "V": ["E", [9,11], undefined, "Max"]
//              }



function makeMove(board, x, y, isBlacksMove) {
  let board_clone = board.slice(0)
  let format = (isBlacksMove) ? BLACK_FORMAT : WHITE_FORMAT
  setCell(board_clone, x, y, format)
  return board_clone
}



function createChildEndNodes(board, isBlacksMove, moves, keys) {

  let scores = []

  for (let {x, y} of moves) {

    // Make move
    let board_clone = board.slice(0)
    let format = (isBlacksMove) ? BLACK_FORMAT : WHITE_FORMAT
    setCell(board_clone, x, y, format)

    let score = (isBlacksMove) //Compute board state
      ? countColors(board_clone).black
      : countColors(board_clone).white

    scores.push(score)
  }

  return scores
}

function moveString(isBlacksMove) {
  return (isBlacksMove) ? "black" : "white"
}

function minOrMax(isBlacksMove, areWeBlack) {
  if (isBlacksMove && areWeBlack) return "Max"
  if (!isBlacksMove && !areWeBlack) return "Max"
  return "Min"
}


/**
 * Steps:
 * 1. Compute the children
 * 2. Add children
 * 3. If there's still moves left to be made, then for each child, start from step 1
 * 4. Return current children and their children
 */

function children(board, isBlacksMove, areWeBlack, movesAvailable, parent) {

  if (movesAvailable === 0) {
    return {}
  }

  // Create children
  let {moves, keys} = getChildMoves(board, moveString(isBlacksMove))

  let graph = createUndefinedItems(keys) // Create object of keys with undefined for now

  for (let {x,y} of moves) {
    let name = cordToString({x,y})
    let board_clone = makeMove(board, x, y, !isBlacksMove)

    let childs = getChildMoves(board_clone, moveString(isBlacksMove))

    // if we're reaching the end, let's calculate the leaf nodes
    if (movesAvailable === 1) {
      let endnodes = createChildEndNodes(board_clone, isBlacksMove, childs.moves, childs.keys)
      graph[name] = [parent, endnodes, undefined, minOrMax(isBlacksMove, areWeBlack)]
    } else {
      graph[name] = [parent, childs.keys, undefined, minOrMax(isBlacksMove)]
    }

    // Add childs children
    graph = Object.assign({}, graph, children(board_clone, !isBlacksMove, areWeBlack, movesAvailable-1, name))
  }

  return graph
}


let grid = gridFromString(`********
                          ********
                          ********
                          ***wb***
                          ***bw***
                          ********
                          ********
                          ********`)

let {moves, keys} = getChildMoves(grid, 'black')
let parent = {"root":[undefined, keys, undefined, "Min"]}

let graph = children(grid, false, true, 5, "root")

console.log(graph)
// console.log(ABPruning(graph))
