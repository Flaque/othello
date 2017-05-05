import {ABPruning} from './prune.js'


test('pruning', () => {

  // Example Graph
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

  // Test that ABPruning returns what we expect it to
  let {cost, path} = ABPruning(graph)
  expect(cost).toEqual(3)
  expect(path).toEqual(['C', 'A', 'P'])
})
