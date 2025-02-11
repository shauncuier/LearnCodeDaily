// Problem 1:
// Given an array of product names, remove duplicates while preserving the original order. Use a loop to achieve this without defining a function.
// Example input:
// ["Laptop","Monitor", "Phone", "Mobile", "Laptop", "Tablet", "Phone", "Mobile", "Monitor"];

// Example output:
// ["Laptop","Monitor", "Phone", "Mobile","Tablet"]


products = ["Laptop", "Monitor", "Phone", "Mobile", "Laptop", "Tablet", "Phone", "Mobile", "Monitor"];

let uniqueProducts = [];
for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (!uniqueProducts.includes(element)) {

        uniqueProducts.push(element);
    }
}
console.log(uniqueProducts);





// Problem 2:
// Given an array of products, each with a category, separate them into two arrays : one for electronics and one for clothing. Store the result in an object.

// input:
// const products = [
//     {name: "Shirt", category: "Clothing"},
//     {name: "Laptop", category: "Electronics"},
//     {name: "T-Shirt", category: "Clothing"},
//     {name: "Headphones", category: "Electronics"},
//     {name: "Jeans", category: "Clothing"},
// ];

// output:
// {
//     electronics: ["Laptop", "Headphones"],
//     clothing: ["T-Shirt", "Jeans"]
// }


const products = [
    { name: "Shirt", category: "Clothing" },
    { name: "Laptop", category: "Electronics" },
    { name: "T-Shirt", category: "Clothing" },
    { name: "Headphones", category: "Electronics" },
    { name: "Jeans", category: "Clothing" },
];

let productsByCategory = {
    electronics: [],
    clothing: []
};

for (let i = 0; i < products.length; i++) {
    const element = products[i];
    if (element.category === "Electronics") {
        productsByCategory.electronics.push(element.name);
    } else {
        productsByCategory.clothing.push(element.name);
    }
}

console.log(productsByCategory);





// Problem 3:
// Given a product price as a string (e.g. "$249"), extract the numeric digits and calculate their sum

// input:
// "$249"

// output:
// 15



// Problem 4:
// Given a product description as a string, reverse the order of the words while keeping the characters in each word unchanged.

// input :
// "Lightweight and durable backpack"

// output
// "backpack durable and Lightweight"