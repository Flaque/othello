let paths = require('./paths.js')
let utils = require('./utils')


test("Test path arrays", () => {
  expect(paths.up(2, 6)).toEqual([{x:2, y:7}])
  expect(paths.down(2, 2)).toEqual([{x: 2, y:1}, {x:2, y:0}])
  expect(paths.right(6, 4)).toEqual([{x:7, y:4}])
  expect(paths.left(2, 4)).toEqual([{x:1, y:4}, {x: 0, y: 4}])

  expect(paths.upRight(5, 5)).toEqual([{x:6, y:6}, {x:7, y:7}])
  expect(paths.downLeft(2, 2)).toEqual([{x:1, y:1}, {x:0, y:0}])
  expect(paths.downRight(6, 1)).toEqual([{x:7, y:0}])
  expect(paths.upLeft(2, 6)).toEqual([{x:1, y:7}])

  console.log(paths.down(0, 1))
})

test("Last is Empty", () => {
  let board = utils.gridFromString(`
    ********
    ********
    ********
    ***B****
    **BW*B**
    **WWW***
    ****W***
    ****W***
    `)

  let down = paths.down(0,1)
  expect(paths.confirmPath(board, down, 'white')).toBe(false)
})

test("Test finding available points", () => {
  let board = utils.gridFromString(`
    ********
    ********
    ********
    b*******
    w*******
    w*******
    w******
    bw******
    `)

  let right = paths.right(0, 0)
  let result = paths.getAvailable(board, right, 'black')
  expect(result).toBeTruthy()
  expect(result.x).toBe(2)
  expect(result.y).toBe(0)

  let up = paths.up(0,0)
  let upResult = paths.getFlipPath(board, up, 'black')
  expect(upResult.length).toBe(3)
})
