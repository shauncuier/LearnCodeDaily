// Problem 1 - Check if a number is even or odd

let num = 15;


if (num % 2 === 0) {
    // console.log("Even");

} else {
    // console.log("Odd");
}


// problem 2 - leep year

let year = 2022;

if (year % 4 === 0) {
    // console.log("Leap year");
}
else {
    // console.log("Not a leap year");
}


// problem 1-50 divisible by 3 and 5


for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        // console.log(i);
    }
}


// problem 4 - biggest word in a string

var friend = ["Rahim", "Karim", "Jabbar", "Salam", "Kalam", "HeroAlom"];

var max = friend[0];

for (var i = 0; i < friend.length; i++) {
    var element = friend[i];
    if (element.length > max.length) {
        max = element;
    }
}
// console.log(max);




// problem 5 - find unique number in an array


var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];

var unique = [];
for (var i = 0; i < numbers.length; i++) {
    let element = numbers[i];
    if (!unique.includes(element)) {
        unique.push(element);
    }
}
// console.log(unique);



const products = ["Laptop", "Monitor", "Phone", "Mobile", "Laptop", "Tablet", "Phone", "Mobile", "Monitor"];
let uniqueProducts = [];
for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (!uniqueProducts.includes(element)) {
        uniqueProducts.push(element);
    }
}



// problem 6 - biggest number in an array

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];

var max = numbers[0];

for (var i = 0; i < numbers.length; i++) {
    var element = numbers[i];
    if (element > max) {
        max = element;
    }
}
console.log(max);




// problem 7 - reverse a string


var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];

var unique = [];
for (var i = 0; i < numbers; i++) {
    let element = numbers;
    if (!unique.includes(element)) {
        unique.push(element);
    }
}
// console.log(unique);

