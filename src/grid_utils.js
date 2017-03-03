function getSides(x, y, width, height) {
  let sides = {
    up        : [x, y - 1],
    upRight   : [x + 1, y - 1],
    right     : [x + 1, y],
    downRight : [x + 1, y + 1],
    down      : [x, y + 1],
    downLeft  : [x - 1, y + 1],
    left      : [x - 1, y],
    upLeft    : [x - 1, y - 1]
  }

  // Shave off sides
  if (x === 0) {
    delete sides.left;
    delete sides.upLeft;
    delete sides.downLeft;
  } else if (x === width-1) {
    delete sides.right;
    delete sides.upRight;
    delete sides.downRight;
  }

  // Shave off top/bottom
  if (y === 0) {
    delete sides.up;
    delete sides.upRight;
    delete sides.upLeft;
  } else if (y === height-1) {
    delete sides.down;
    delete sides.downRight;
    delete sides.downLeft;
  }

  return sides
}

export {getSides}
