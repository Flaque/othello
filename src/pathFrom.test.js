let stringToGrid = require('./stringToGrid.js').default
let searchUp = require('./pathFrom.js').searchUp
let searchDown = require('./pathFrom.js').searchDown
let pathFrom = require('./pathFrom.js').pathFrom

test('searchUp correctly finds paths', () => {

  let grid = stringToGrid(`
    ********
    ********
    ********
    ********
    w*******
    w*******
    w*******
    b*******
  `)

  console.log(searchUp(grid, 0, 7))

})
