/*
Task-2
Write a program to calculate the average marks of Mathematics, Biology, Chemistry, Physics, and Bangla of a student.

Input:
The first line of the input is the marks of the five subjects mentioned above, respectively.

Output:
Print the result in 2 decimal places.

Sample Input:
75.25, 65, 80, 35.45, 99.50

Sample Output:
71.04
*/

// Solution

var math = 75.25;
var bio = 65;
var chem = 80;
var phy = 35.45;
var bangla = 99.50;

var total = math + bio + chem + phy + bangla;

var avg = total / 5;

console.log(avg.toFixed(2));