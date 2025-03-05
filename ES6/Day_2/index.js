
// const person = {
//     name: 'John',
//     age: 30,
//     hobbies: ['reading', 'cooking', 'swimming'],
// };

// console.log(person.name);
// console.log(Object.keys(person));
// console.log(Object.values(person));
// console.log(Object.entries(person));


// const person = {
//     name: 'John',
//     age: 30,
//     hobbies: ['reading', 'cooking', 'swimming', 'coding', 'gaming', 'watching movies'],
//     details: {
//         address: '123 Main Street',
//         city: 'New York',
//         isMarried: false,
//         hasKids: true,
//         job: 'Developer',
//         salary: 100000,
//         parents:{
//             father: 'Mike',
//             mother: 'Jane'
//         }
//     },
// }

// console.log(person.details.address);
// console.log(person.details.parents.father);

const products = [
    { id: 1, name: 'laptop', price: 1000 },
    { id: 2, name: 'desktop', price: 1500 },
    { id: 3, name: 'phone', price: 500 },
    { id: 4, name: 'tablet', price: 800 },
    { id: 5, name: 'smartwatch', price: 400 },
    { id: 6, name: 'keyboard', price: 50 },
    { id: 7, name: 'mouse', price: 30 },
    { id: 8, name: 'monitor', price: 300 },
    { id: 9, name: 'printer', price: 200 },
    { id: 10, name: 'speaker', price: 150 },


];

// find() method

const product = products.find(product => product.id === 9);
// console.log(product);


// filter() method

const newProduct = products.filter(product => product.price >= 1000);
// console.log(newProduct);

// forEach() method

products.forEach(product => {
    if (product.price > 500) {
        // console.log(product.name);

    }
});



// map() method

const productNames = products.map(product => product.name);
// console.log(productNames);



const mobileProducts = [
    { id: 1, name: 'iphone', price: 1000, color: 'black' },
    { id: 2, name: 'samsung', price: 800, color: 'white' },
    { id: 3, name: 'nokia', price: 500, color: 'red' },
    { id: 33, name: 'nokia', price: 500, color: 'red' },
    { id: 23, name: 'nokia', price: 500, color: 'red' },
    { id: 44, name: 'huawei', price: 600, color: 'blue' },
    { id: 5, name: 'sony', price: 700, color: 'green' },
    { id: 6, name: 'lg', price: 400, color: 'yellow' },
    { id: 7, name: 'htc', price: 300, color: 'purple' },
    { id: 8, name: 'motorola', price: 200, color: 'orange' },
    { id: 9, name: 'blackberry', price: 150, color: 'pink' },
    { id: 10, name: 'alcatel', price: 100, color: 'brown' },
];


const singleMobileProduct = mobileProducts.filter(product => product.name === 'nokia');
console.log(singleMobileProduct);


const singleProduct = mobileProducts.find(product => product.id === 8);
// console.log(singleProduct);


mobileProducts.forEach(product => {
    // console.log(product);
});

const newMobileProducts = mobileProducts.map(product => {
    return {
        ...product,
        price: product.price + 100,
        color: product.color.toUpperCase(),
    }
});

// console.log(newMobileProducts);



