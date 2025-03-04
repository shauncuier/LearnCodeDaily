//  

const person = {
    name: 'John',
    age: 25,
    address: {
        city: 'New York',
        country: 'USA'
    }

};
Object.freeze(person);
Object.seal(person);

person.status = 'single';

console.log(Object.keys(person)); // [ 'name', 'age', 'address' ]
console.log(Object.values(person)); // [ 'John', 25, { city: 'New York', country: 'USA' } ]
console.log(Object.entries(person)); // [ [ 'name', 'John' ], [ 'age', 25 ], [ 'address', { city: 'New York', country: 'USA' } ] ]

