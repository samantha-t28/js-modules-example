# Javascript Modules Example

Official documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

## What I've learned

To use JavaScript Modules, first we need to specify the content-type to module in your HTML. If the content-type is text/javascript and you're using module, the browser will likely throw an error and will not treat it as an ES6 module (unable to recognize import / export statements).

Having multiple .js files can easily lead to errors, such as overriding functions, variables, and classes in other files, when they share the global namespace. This occurs when scripts are loaded in the same environment, such as in a web browser.

### How can module solve this problem?

Add the `export` keyword in front of the function, variable and class. It allows you to export into another file.

#### Example Code:
```javascript
// main.js
import { name, dimension } from ".js/square.js";
// square.js
export const name = 'Square';

export function dimension(width, height) {
    return width * height;
}
```
### Wouldn't it be redundant to add the `export` keyword to each function, variable or classes? To solve that, we can just do this:
```javascript

const name = 'Square';

function dimension(width, height) {
    return width * height;
}
// export it all at once
export { name, dimension };

```
### However, this isn't necessarily redunatnt; rather, it's a feature of the module system.

* After you export functions, variables, or classes from a module, you can use them in other modules by using the `import` keyword. You should include the names of the items you want to import inside the curly braces {}. This syntax is necessary for named exports.

## There are two types of `Imports`, and what are the differences?

* `import`  statements are typically placed at the top of the module or script because they are handled first, helping the browser engine load all the dependencies beforehand. Also it's easier to analyze the dependencies.

### 1. Named Imports

#### Example Code:
```javascript
import { name, dimension } from ".js/square.js";
```
* This is a form of selective imports that allows you to import only specific exports from a module
* If `square.js` contains multiple exports but you are only interested in using `name` and `dimension`, you would use named imports to bring only these two into your current file.

### 2. Namespace Imports

#### Example Code:
```javascript
import * as Square ".js/square.js";
```
* This is handy when a module exports a large number of items
* This method imports all exports from the specified module as properties of a single object


## `export default`  
* is a feature where it primarily specifies a default function or class to export, representing the main functionality provided by the module. This is especially useful when one function or class is the clear primary focus. Curly braces are not required when importing a default export because only one default per module is allowed.

#### Example Code

This example demonstrates how to properly export and import functions in a JavaScript module.

**main.js**

```javascript
// Import the default export 'functionB' along with named exports 'functionA' and 'functionC'
import { functionA, functionC } from "./js/square.js";
//  functionB is the default export of square.js, so it is imported separately
import functionB from "./js/square.js";
```
**square.js**

```javascript
// Export 'functionA' and 'functionC' as named exports
export function functionA() {
  // Implementation of functionA
}

// Define 'functionB' - Primary function
function functionB() {
  // Implementation of functionB
}

// Export 'functionC' as a named export
export function functionC() {
  // Implementation of functionC
}

// Export 'functionB' as the default export
export default functionB;
```

## What if I have multiple modules that might have overlapping names?

The `as` keyword is used in import statements to rename the exports being exported. This is useful when importing items from different modules that may have the same name but need to referred differently within the importing module to avoid naming conflicts (you can name it whatever you want for clarity).
#### Example Code

**main.js** 

```javascript
// import { dimension as nameWhateverYouWant } from './triangle.js'
import { dimension as triangleDimension } from './triangle.js';
import { dimension as squareDimension } from './square.js';
```

## How to organize your main.js to eliminate x amount of import lines?

To simplify and organize your imports, you can use the `Aggregating Module` technique to combine your submodules into a parent module. Imagine you’re preparing for a picnic and you have different sets of items: one container holds condiments like ketchup, mustard, and relish, while another container holds tableware such as utensils, napkins, and plates. Instead of carrying each container individually, it would be much more convenient to place all these containers into one large picnic basket. This is similar to how an aggregating module works, simplifying the management of multiple components into one cohesive unit and structuring them more efficiently.

### 1. Containers as Modules:
Holding a group of related items (like condiments or utensils) mirrors how individual modules group related functionalities or components. This allows for better organization and easier maintenance of each category within your code base.

### 2. Picnic Basket as Aggregating Module:
The giant picnic basket that holds all these smaller containers  that re-exports multiple modules. Just as the basket makes it easier to carry everything you need for the picnic in one go, the aggregating module allows you to import everything you need through a single import statement.

## What is `Cyclic Imports` and Why Should We Avoid Them?

Essentially, cyclic imports are like a loop where two or more modules depend on each other for functionality.

#### Example Code:

**grape.js**

``` javascript

import { eatStrawberry } from  './strawberry.js';

function eatGrape() {
    console.log("Eating grape");
    eatStrawberry(); // call the function from strawberry.js
}

export { eatGrape };

```
**strawberry.js**

``` javascript

import { eatGrape } from './grape.js';

function eatStrawberry() {
    console.log("Eating strawberry");
    eatGrape(); // call the function from grape.js
}

export { eatStrawberry };

```
This mutual dependency creates a circular reference. When the code executes, it will keep bouncing back and forth between the two functions, potentially causing an infinite loop.

### 1. Leads to confusion and difficulties in clarity, readability and to understand (Spaghetti Code).
### 2. Increases cognitive load for developers to keep track the independencies and understand how the data flows.
### 3. It complicates the debugging process and can make the code harder to maintain.

## What is the solution to avoid this situation?

### Merge two modules into one:

* Create a module where you want to merge **grape.js** and **strawberry.js**

**fruits.js**
```javascript

// Functions from grape.js
function eatGrape() {
    console.log("Eating grape.");
}

function growGrape() {
    console.log("Growing grapes.");
}

// Functions from strawberry.js
function eatStrawberry() {
    console.log("Eating strawberry.");
}

function growStrawberry() {
    console.log("Growing strawberries.");
}

// Exporting all functions
export { growGrape, eatGrape, growStrawberry, eatStrawberry };

```

### Move the shared code into a third module:
**fruitEatingAction.js**

* this module handle the logic to eat grapes and strawberries. It manages the dependencies internally, avoiding cyclic imports.

```javascript

// Function to eat grape
function eatGrape() {
    console.log("Eating grape");
}

// Function to eat strawberry
function eatStrawberry() {
    console.log("Eating strawberry");
}

export { eatGrape, eatStrawberry };

```

## What is Dynamic Module Imports?

`Dynamic Module Imports` In the application, certain codes are only loaded after the initial page load, some are loaded at a later point, and others are not loaded at all. In contrast, `static imports`, as seen in the examples above, download all the modules when the user loads the browser.

#### Example (Dynamic Module Imports):

**math.js**
```javascript
function addition( x , y ){
    return x + y;
}

function subtraction( x, y ){
    return x - y;
}

export {addition, subtraction};
```
**index.js**
```javascript
// Ensuring the button exists and importing modules only when needed.
const button = document.querySelector(".button");

button.addEventListener("click", () => {

    import('./math.js').then(({ addition, subtraction }) => {
        // Example use of the imported functions
        console.log(addition(10, 5));
        console.log(subtraction(10, 5));
    }).catch(error => {
        console.error("Failed to load the module:", error);
    });
});
```
* This example demonstrates how to load modules on-demand when a button is clicked.
* Dynamic Module Imports return a Promise that can be in a pending, fulfilled, or rejected state.
* The 'pending' state occurs as the code awaits the user's click event. Once clicked, the import promise tries to fulfill by loading the module and executing the code within the `.then()` block.
* The .then() block receives the module from math.js as its argument. It uses the destructuring method to extract the addition and subtraction functions directly from the module object (the entire set of exports from the math.js file).
* If the module fails to load (e.g., due to network issues or if the file is missing), the promise is rejected, and the error is handled in the .catch() block, logging an appropriate error message.