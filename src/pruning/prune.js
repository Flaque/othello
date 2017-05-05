import _ from 'lodash'
import {updateAvailable, getAvailable, setCell, BLACK_FORMAT, WHITE_FORMAT, countColors} from '../grid/grid.js'
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
  if (graph == undefined) return

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

export {
  ABPruning
}
