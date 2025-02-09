const school = 'Sabuj Shishayatan School';


console.log(school);
console.log(school.toLowerCase());
console.log(school.toUpperCase());



// console.log(school.length);


const subject = 'Mathematics';
const book = 'mathematics';


if (subject.toLowerCase === book.toLowerCase) {
    console.log('Matched');
} else {
    console.log('Not Matched');
}


const drink = 'water';
const liquid = '    water   ';


if (drink.trim() === liquid.trim()) {
    console.log('Matched');
}
else {
    console.log('Not Matched');
}