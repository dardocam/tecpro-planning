"use strict";

console.log(a); //ReferenceError: Cannot access 'a' before initialization
console.log(b); // undefined

let a = 1; // sin Hoisting
var b = 1; // con Hoisting

const c = 1; // sin Hoisting
c = 2; // TypeError: Assignment to constant variable
