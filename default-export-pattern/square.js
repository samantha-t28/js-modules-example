/**
  * @description Given a square width and height it returns the dimension
  */
export function dimension(width, height) {
    return width * height;
}

export const name = 'SQUARE';

// This function only exists on this file because it's not exported
const squareDimension = (width, height) => {
  return dimension(width, height)
}



// This function will be provided as a default in case the consumer doesn't
// specify the file to be imported
// This pattern allows the consumer to use all the functions we want to expose
// at once
const exportables = {
  dimension : dimension,
  name: name
}
export default exportables;
// export default {
//   dimension,
//   name
// }