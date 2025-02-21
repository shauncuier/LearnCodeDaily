/*

Task-4
What will be the result of the following codes:

var a = isNaN(‘11’);

var a = isNaN(2-10);

Explain your answers.

*/

// Solution
var a = isNaN("11");
console.log(a);

var a = isNaN(2-10);

console.log(a);

// Explanation: isNaN() function is used to check whether a value is an illegal number or not. It returns true if the value is not a number, otherwise it returns false. In the first code, the value is a string, so it is not a number. So, the output will be true. In the second code, the value is a number, so it is a number. So, the output will be false.