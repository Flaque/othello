let _ = require('lodash')

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
  console.log(val)

  let path = val[1]
  path.reverse()
  console.log(path)
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

  indexOfVal = 0
  if (graph[node][3] === "Max") {
    indexOfVal = values.indexOf(_.max(values))
  } else {
    indexOfVal = values.indexOf(_.min(values))
  }

  visited = visited[indexOfVal]
  visited.push(node)
  return [values[indexOfVal], visited]
}


let graph = {"C":[undefined, ["A","D","E"], undefined, "Max"],
             "A":["C", ["P","B"], undefined, "Min"],
             "D": ["C", ["R",42], undefined, "Min"],
             "E":["C", ["R","V"], undefined, "Min"],
             "P":["A", [2,3], undefined, "Max"],
             "B": ["A", [5,100], undefined, "Max"],
             "R": ["D", [0], undefined, "Max"],
             "T": ["E", [2,1], undefined, "Max"],
             "V": ["E", [9,11], undefined, "Max"]
             }

ABPruning(graph)
