/**
  * @description Given a triangle and it's 3 sides it returns the dimension
  */
export function dimension(side1, side2, side3) {
  return side1 * side1 + side2 * side2 + side3 * side3;
}

// This function only exists on this file because it's not exported
const triangleDimension = (side1, side2,side3) => {
  return dimension(side1, side2,side3)
}