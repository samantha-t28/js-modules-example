// Importing the default function from square.js
import square from './square.js'
// Importing only the name from square.js
import { name } from './square.js'
import { dimension as triangleDimension } from './triangle.js'
import { dimension as triangleDimensionWithWhateverIwantName } from './triangle.js'

// This is using the default export of square.js
const squareDimensions = square(2, 2);
console.log(squareDimensions)

// This is using the named export "name" from square.js
console.log(name)

// This is using the named export "name" from square.js
const triangleDimensions = triangleDimension(2, 2, 2);

console.log(triangleDimensions)

const triangleDimensions2 = triangleDimensionWithWhateverIwantName(2, 2, 2);

console.log(triangleDimensions2)
