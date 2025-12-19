/* Implementation: 
    Build a directed graph:
    One map for containment
    One map for reverse containment
    Part 1: Use DFS to traverse upward
    Part 2: Use recursive DFS to count nested bags
*/

// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// read input file
const input = fs.readFileSync('input7.txt', 'utf8').trim();

// normalize line endings
const lines = input.replace(/\r\n/g, '\n').split('\n');

// maps to store bag relationships
// Map:
// The Map object holds key-value pairs and remembers the original insertion order of the keys
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
const containsMap = new Map(); // bag -> [{ color, count }]
const containedByMap = new Map(); // bag -> [parent bags]

// parse input rules into maps
for (const line of lines) {
    const [outer, inner] = line.split(' bags contain ');

    // initialize maps if not present
    if (!containsMap.has(outer)) containsMap.set(outer, []);
    if (!containedByMap.has(outer)) containedByMap.set(outer, []);

    // if no other bags are contained, continue
    if (inner === 'no other bags.') continue;

    // extract contained bags
    const matches = inner.matchAll(/(\d+) ([a-z ]+) bag/g);

     // String.prototype.match:
    // The match() method of String values retrieves the result of matching this string against a regular expression.
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    for (const match of matches) {
        const count = Number(match[1]);
        const color = match[2];

        containsMap.get(outer).push({ color, count });

        if (!containedByMap.has(color)) containedByMap.set(color, []);
        containedByMap.get(color).push(outer);
    }
}


 // part 1:
 // find all bags that can eventually contain "shiny gold"
const visited = new Set();

function findContainers(color) {
    const parents = containedByMap.get(color) || [];
    for (const parent of parents) {
        if (!visited.has(parent)) {
            visited.add(parent);
            findContainers(parent);
        }
    }
}

findContainers('shiny gold');


 // part 2:
 // count total bags inside a given bag color
function countBags(color) {
    let total = 0;
    const contents = containsMap.get(color) || [];

    for (const { color: innerColor, count } of contents) {
        // count the bags directly inside + bags inside those bags
        total += count + count * countBags(innerColor);
    }

    return total;
}

// Output answers
console.log('Part 1 - Bag colors that can contain shiny gold:', visited.size);
console.log('Part 2 - Total bags inside shiny gold:', countBags('shiny gold'));
