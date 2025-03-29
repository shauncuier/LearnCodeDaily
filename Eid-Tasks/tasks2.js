// ================== Eid Task 2 =======================

const myArray = [10, 20, 30, 40, 50];
const [first,,,, fifth] = myArray;
console.log(first, fifth);


const arr = [1, 2, 3, 4, 5];
const newArr = arr.map((x) => {
    if(x % 2 === 0) {
        return x * 2;
    } 
})
console.log(newArr);

const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [7, 8, 9];
const d = [...a, ...b, ...c];
const e = d.filter((n) => {
    return n % 2 === 0;
})

// console.log(e); Gives an array of even numbers
console.log(...e); // Gives the even numbers in the array as separate values

