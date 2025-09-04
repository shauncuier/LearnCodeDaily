// Basic Types in TypeScript


// Primitive Types
let name: string = "John Doe";
let age: number = 30;
let isStudent: boolean = true;
let notSure: any = "Maybe a string";



// Array Types
let list: (number)[] = [1, 2, 3, 4, 5];
let string: Array<string> = ["1"];
let mixed: (number | string | boolean)[] = [1, "2", 3, true];


// Object Types
let user: {
    name: string;
    age: number;
    gender?: 'male' | 'female' | 'other';
} = {
    name: "John Doe",
    age: 30,
    gender: 'other'
};



// Optional Properties
let user2: {
    name: string;
    age: number;
    gender?: 'male' | 'female' | 'other';
} = {
    name: "Jane Doe",
    age: 25
};

export { };
