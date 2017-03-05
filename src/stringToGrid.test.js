/**
 * Jest Test file
 */

let stringToGrid = require('./stringToGrid.js').default

test('stringToGrid correctly produces a grid', () => {
  const string = `
    bw******
    ********
    ********
    ********
    ********
    ********
    ********
    wb******
  `

  let grid = stringToGrid(string)

  // Test is 8 by 8
  expect(grid.length).toBe(8)
  expect(grid[0].length).toBe(8)

  expect(grid[0][0].x).toBe(0)
  expect(grid[0][0].y).toBe(0)


  expect(grid[0][0].player).toBe('black')
  expect(grid[0][1].player).toBe('white')
  expect(grid[0][2].player).toBe('empty')

  console.log(grid[0][0])
  expect(grid[0][0].player).toBe('white')

})
