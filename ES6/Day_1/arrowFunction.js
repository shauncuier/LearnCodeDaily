//  ArrowFunsion
//  - ArrowFunction is a new way to write function in ES6
//  - ArrowFunction is a shorter syntax for writing function expressions
//  - ArrowFunction does not have its own this keyword
//  - ArrowFunction does not have arguments object
//  - ArrowFunction cannot be used as a constructor
//  - ArrowFunction cannot be used as a generator
//  - ArrowFunction cannot be used as a method
//  - ArrowFunction does not have a prototype property
//  - ArrowFunction cannot be called with new
//  - ArrowFunction does not have a call, apply, or bind method
//  - ArrowFunction does not have a super keyword
//  - ArrowFunction does not have a new.target keyword
//  - ArrowFunction does not have a arguments object
//  - ArrowFunction does not have a yield keyword
//  - ArrowFunction does not have a prototype property

// 1. ArrowFunction Syntax
// 2. ArrowFunction with parameters
// 3. ArrowFunction with multiple parameters
// 4. ArrowFunction with multiple statements


// 1. ArrowFunction Syntax
// Syntax: () => {}
// Example:
const arrowFunction = () => {
    // console.log('ArrowFunction');
}
arrowFunction();


const sum = (a = 0, b = 0) => a + b;

console.log(sum(10));