const person = {
    name: 'John',
    age: 25,
    address: {
        city: 'New York',
        country: 'USA'
    }

};

const { name, age, address: { city, country } } = person;


console.log(name); // John
console.log(age); // 25
console.log(city); // New York
console.log(country); // USA








