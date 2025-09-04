# JavaScript Problem Solving Collection

A collection of fundamental JavaScript problem-solving functions covering various programming concepts and algorithms.

## Overview

This repository contains 10 JavaScript functions that solve common programming problems. Each function demonstrates different programming concepts including string manipulation, array operations, mathematical calculations, and control flow.

## Getting Started

### Prerequisites
- Any modern web browser with JavaScript support
- Node.js (optional, for running in terminal)

### Running the Code
1. Clone this repository:
   ```bash
   git clone https://github.com/shauncuier/LearnCodeDaily.git
   cd LearnCodeDaily/javascript-problem
   ```
2. Open `main.js` in your preferred code editor
3. Run in browser console or Node.js environment
4. Call any function with appropriate parameters

## Problems and Solutions

### 1. Reverse a String
**Function:** `reverseString(str)`
- **Purpose:** Reverses the characters in a given string
- **Method:** Splits string into array, reverses it, then joins back
- **Example:** 
  ```javascript
  reverseString("hello") // Returns: "olleh"
  ```

### 2. Count Vowels in a String
**Function:** `countVowels(str)`
- **Purpose:** Counts the number of vowels (a, e, i, o, u) in a string
- **Method:** Iterates through each character and checks against vowel set
- **Example:**
  ```javascript
  countVowels("hello world") // Returns: 3
  ```

### 3. Check for Palindrome
**Function:** `isPalindrome(str)`
- **Purpose:** Determines if a string reads the same forwards and backwards
- **Method:** Compares original string with its reverse
- **Example:**
  ```javascript
  isPalindrome("racecar") // Returns: true
  isPalindrome("hello") // Returns: false
  ```

### 4. Find the Maximum Number
**Function:** `findMax(arr)`
- **Purpose:** Finds the largest number in an array
- **Method:** Iterates through array comparing each element
- **Example:**
  ```javascript
  findMax([1, 5, 3, 9, 2]) // Returns: 9
  ```

### 5. Remove Duplicates from an Array
**Function:** `removeDuplicates(arr)`
- **Purpose:** Creates a new array with unique elements only
- **Method:** Builds new array by checking if element already exists
- **Example:**
  ```javascript
  removeDuplicates([1, 2, 2, 3, 4, 4, 5]) // Returns: [1, 2, 3, 4, 5]
  ```

### 6. Sum of All Numbers in an Array
**Function:** `sumArray(arr)`
- **Purpose:** Calculates the total sum of all numbers in an array
- **Method:** Iterates through array accumulating sum
- **Example:**
  ```javascript
  sumArray([1, 2, 3, 4, 5]) // Returns: 15
  ```

### 7. Find Even Numbers in an Array
**Function:** `findEvens(arr)`
- **Purpose:** Filters and returns only even numbers from an array
- **Method:** Uses modulo operator to check divisibility by 2
- **Example:**
  ```javascript
  findEvens([1, 2, 3, 4, 5, 6]) // Returns: [2, 4, 6]
  ```

### 8. Capitalize First Letter of Each Word
**Function:** `capitalizeWords(str)`
- **Purpose:** Converts the first letter of each word to uppercase
- **Method:** Splits string into words, capitalizes first letter of each
- **Example:**
  ```javascript
  capitalizeWords("hello world") // Returns: "Hello World"
  ```

### 9. Find the Factorial of a Number
**Function:** `factorial(n)`
- **Purpose:** Calculates the factorial of a given number
- **Method:** Iteratively multiplies numbers from 1 to n
- **Example:**
  ```javascript
  factorial(5) // Returns: 120 (5 × 4 × 3 × 2 × 1)
  ```

### 10. PingPong Challenge
**Function:** `pingPong()`
- **Purpose:** Prints numbers 1-20 with special rules (similar to FizzBuzz)
- **Rules:**
  - Numbers divisible by both 3 and 5: "PingPong"
  - Numbers divisible by 3: "Ping"
  - Numbers divisible by 5: "Pong"
  - All other numbers: the number itself
- **Example Output:**
  ```
  1, 2, Ping, 4, Pong, Ping, 7, 8, Ping, Pong, 11, Ping, 13, 14, PingPong, ...
  ```

## How to Use

### Example Usage
```javascript
// String operations
console.log(reverseString("hello"));        // "olleh"
console.log(countVowels("programming"));     // 3
console.log(isPalindrome("racecar"));        // true

// Array operations  
console.log(findMax([1, 5, 3, 9, 2]));      // 9
console.log(removeDuplicates([1, 2, 2, 3])); // [1, 2, 3]
console.log(sumArray([1, 2, 3, 4, 5]));     // 15
console.log(findEvens([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

// Text processing
console.log(capitalizeWords("hello world")); // "Hello World"

// Mathematical operations
console.log(factorial(5));                   // 120

// Special challenges
pingPong(); // Prints: 1, 2, Ping, 4, Pong, Ping, 7, 8, Ping, Pong, 11, Ping, 13, 14, PingPong, 16, 17, Ping, 19, Pong
```

## Concepts Demonstrated

- **String Manipulation:** Reversing, character checking, word processing
- **Array Operations:** Filtering, mapping, reducing, finding elements
- **Loops and Iteration:** For loops, for...of loops
- **Conditional Logic:** If-else statements, modulo operations
- **Mathematical Operations:** Factorial calculation, sum accumulation
- **Problem Solving Patterns:** Search, filter, transform, validate

## Files in Repository

- `main.js` - Contains all 10 problem-solving functions with detailed comments
- `README.md` - This comprehensive documentation file
- `script.md` - Video script explaining each problem step-by-step

## Learning Objectives

After working through these problems, you will understand:
- **String Manipulation**: Reversing, character analysis, and text transformation
- **Array Processing**: Filtering, searching, and data transformation
- **Algorithm Design**: Step-by-step problem-solving approaches
- **Loop Structures**: Different iteration patterns and their applications
- **Conditional Logic**: Decision-making in programming
- **Mathematical Computations**: Factorial calculations and accumulation patterns

## Performance Considerations

These implementations prioritize readability and understanding over optimization. For production use, consider:
- Using built-in methods like `Math.max()` for finding maximum values
- Leveraging `Set` for duplicate removal
- Using `Array.prototype.filter()` and `Array.prototype.reduce()` for functional approaches

## Contributing

Feel free to:
- Submit improvements or optimizations
- Add test cases
- Suggest additional problems
- Report issues or bugs

## License

This project is open source and available under the [MIT License](LICENSE).

## Repository

🔗 **GitHub**: [https://github.com/shauncuier/LearnCodeDaily](https://github.com/shauncuier/LearnCodeDaily)

## Author

Created as part of JavaScript problem-solving practice and algorithm implementation exercises.
**Contact**: [Your Contact Information]
