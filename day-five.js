/* Implementation: 
    Replace characters (F/L → 0, B/R → 1)
    Interpret the result as a binary number
    Part 1: Find the maximum ID
    Part 2: Sort IDs and find the missing one
*/

// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// read input
const input = fs.readFileSync('input5.txt', 'utf8').trim();

// split boarding passes by line
const passes = input.split('\n');

const seatIds = [];


// convert boarding pass to seat ID
function getSeatId(pass) {
    // Convert row (F/B) to binary
    // String.prototype.slice:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
    // String.prototype.replace:
    // The replace() method of String values returns a new string with one, some, or all matches of a pattern replaced by a replacement
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    const rowBinary = pass
        .slice(0, 7)
        .replace(/F/g, '0')
        .replace(/B/g, '1');

    // convert column (L/R) to binary
    const colBinary = pass
        .slice(7)
        .replace(/L/g, '0')
        .replace(/R/g, '1');
    // parseInt (binary):
    // The parseInt() function parses a string argument and returns an integer of the specified radix
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    const row = parseInt(rowBinary, 2);
    const column = parseInt(colBinary, 2);

    return row * 8 + column;
}

// compute seat IDs
for (const pass of passes) {
    seatIds.push(getSeatId(pass));
}

// part 1: highest seat ID
const maxSeatId = Math.max(...seatIds);
console.log('Part 1 - Highest seat ID:', maxSeatId);

// part 2: find missing seat
// Array.prototype.sort:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
seatIds.sort((a, b) => a - b);

let mySeatId = null;

for (let i = 1; i < seatIds.length; i++) {
    if (seatIds[i] !== seatIds[i - 1] + 1) {
        mySeatId = seatIds[i - 1] + 1;
        break;
    }
}
// result
console.log('Seat ID:', mySeatId);
