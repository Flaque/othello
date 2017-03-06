let paths = require('./paths.js')
let utils = require('./utils')


test("Test path arrays", () => {
  expect(paths.up(2, 6)).toEqual([{x:2, y:7}])
  expect(paths.down(2, 2)).toEqual([{x: 2, y:1}, {x:2, y:0}])
  expect(paths.right(6, 4)).toEqual([{x:7, y:4}])
  expect(paths.left(2, 4)).toEqual([{x:1, y:4}, {x: 0, y: 4}])
})

test("Test confirming a path", () => {

  // Test a bad path
  let board = utils.gridFromString(`
    ********
    ********
    ********
    ********
    b*******
    w*******
    w*******
    b*******
    `)
  expect(paths.confirmPath(board, paths.up(0, 0), "black")).toBe(false)

  // Test a good path
  board = utils.gridFromString(`
    ********
    ********
    ********
    ********
    ********
    ********
    w*******
    b*******
    `)
  let path = paths.confirmPath(board, paths.up(0, 0), "black")
  expect(path).toEqual([{ x: 0, y: 1 }, { x: 0, y: 2 } ])

  // Test an edge path

  board = utils.gridFromString(`
    b*******
    ********
    ********
    ********
    ********
    ********
    ********
    ********
    `)

  path = paths.confirmPath(board, paths.up(0, 7), "black")
  expect(path).toBe(false)
})
