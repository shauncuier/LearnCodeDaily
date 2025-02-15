// Write a program to count the total number of alphabets, digits and special characters in string.
// input: he**llo&20@25#

function countAlphabetsDigitsSpecialChars(str) {
    let alphabets = 0;
    let digits = 0;
    let specialChars = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[a-zA-Z]/)) {
        alphabets++;
        } else if (str[i].match(/[0-9]/)) {
        digits++;
        } else {
        specialChars++;
        }
    }
    return { alphabets, digits, specialChars };
    }
    console.log(countAlphabetsDigitsSpecialChars('he**llo&20@25#'));
    