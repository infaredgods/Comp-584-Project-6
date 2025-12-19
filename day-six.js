/* Implementation: 
    Split input into groups by blank lines
    Part 1: Use a Set to count unique answers
    Part 2: Find the intersection of answers across all people
*/

// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// read input file
const input = fs.readFileSync('input6.txt', 'utf8').trim();

// normalize line endings
const normalized = input.replace(/\r\n/g, '\n');

// split groups by blank lines
// String.prototype.split:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const groups = normalized.split(/\n{2,}/);

let part1Sum = 0;
let part2Sum = 0;

for (const group of groups) {
    const people = group.split('\n');

    // part one
    // want to know which questions anyone answered "yes" to

    // use a set to collect unique "yes" answers
    // Set:
    // The Set object lets you store unique values of any type, whether primitive values or object references.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const anyYes = new Set();

    for (const person of people) {
        for (const char of person) {
            anyYes.add(char);
        }
    }

    part1Sum += anyYes.size;

    // part two
    // want to know which questions everyone answered "yes" to

    // start with first person's answers
    let everyoneYes = new Set(people[0]);

    // intersect with remaining people's answers
    for (let i = 1; i < people.length; i++) {
        const personSet = new Set(people[i]);
        everyoneYes = new Set(
            [...everyoneYes].filter(char => personSet.has(char))
        );
    }

    // add count of common "yes" answers
    part2Sum += everyoneYes.size;
}
// output of part one
console.log('Sum of counts:', part1Sum);

// output of part two
console.log('Sum of counts:', part2Sum);
