/* Implementation: 
    Each line is parsed into: minimum, maximum, required letter, and password
    Part 1: Count how many times the letter appears
    Part 2: Check the two positions using exclusive OR (XOR) logic
*/

// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// import Node.js Path module to safely construct file paths
// documentation: https://nodejs.org/api/path.html
const path = require('path');

// read the input file as a string
const input = fs.readFileSync(path.join(__dirname, './input2.txt'), 'utf-8');

// split input into individual lines
// string.prototype.split:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const lines = input.split('\n');

// variable to count valid passwords
let validPasswordsCount = 0;

// process each line
// for...of loop documentation:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
for (const line of lines) {
    // skip empty line 
    if (!line) continue;

    // split policy and password
    const [policy, password] = line.split(': ');

    // split policy into range and letter
    const [range, letter] = policy.split(' ');

    // split range into minimum and maximum values
    // map(Number) converts string values to numbers
    // Array.prototype.map:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const [min, max] = range.split('-').map(Number);

    // count occurences of the letter in the password
    let count = 0;
    for (const char of password) {
        if (char === letter) {
            count++;
        }
    }

    // check if password is valid
    if (count >= min && count <= max) {
        validPasswordsCount++;
    }
}

// part two
let validPasswordCount = 0;

// Iterate through each password entry
for (const line of lines) {

    // skip empty lines
    if (!line) continue;

    // split policy from password
    const [policy, password] = line.split(': ');

    // split policy into positions and letter
    const [positions, letter] = policy.split(' ');

    // extract the two positions (1-based indexing)
    const [pos1, pos2] = positions.split('-').map(Number);

    // check if the letter is at exactly one of the specified positions
    const match1 = password[pos1 - 1] === letter;
    const match2 = password[pos2 - 1] === letter;

    // password is valid if exactly one position matches
    if ((match1 && !match2) || (!match1 && match2)) {
        validPasswordCount++;
    }
}

// output the result
console.log(`Valid passwords (part 1): ${validPasswordsCount}`);

// Output the final count of valid passwords
console.log(`Valid passwords (Part 2): ${validPasswordCount}`);
