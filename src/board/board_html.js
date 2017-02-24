/**
 * Returns the HTML for a single square
 */
function square(x, y) {
  return ` <div class="col-xs square" data-x=${x} data-y=${y}>
      <div class="circle"></div>
    </div>`
}

/**
 * Returns the HTML for a single row
 */
function row(y, width) {
  let html = ""
  for (let x = 0; x < width; x++) {
    html += square(x, y)
  }
  return `<div class="row"> ${html} </div>`
}

/**
 * Returns the HTML for a board
 */
function board(height, width) {
  let html = ""
  for (let y = 0; y < height; y++) {
    html += row(y, width)
  }
  return `<div class="board"> ${html} </div>`
}

/**
 * Exports "board" as the only public function
 * in this module.
 */
export default board;
