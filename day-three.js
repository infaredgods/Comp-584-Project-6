/* Implementation: 
    Store the map as an array of strings
    Use (x % width) to wrap horizontally
    Increment position step-by-step until reaching the bottom
    Part 2: Repeat for multiple slopes and multiply results
*/

// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// import Node.js Path module to safely construct file paths
// documentation: https://nodejs.org/api/path.html
const path = require('path');

// read the input file as a string
const input = fs.readFileSync(path.join(__dirname, './input3.txt'), 'utf-8');

// trim + split on any newline type
// String.prototype.trim:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// String.prototype.split:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const map = input.trim().split(/\r?\n/);

// width of each map row    
const width = map[0].length;

function countTrees(right, down) {
    let row = 0;
    let col = 0;
    let trees = 0;

    // loop until we reach the bottom of the map
    while (row < map.length) {
        // check if current position is a tree
        // String indexing:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#character_access
        if (map[row][col] === '#') {
            trees++;
        }

        // move according to the slope
        row += down;

        // wrap horizontally using modulo 
        // modulo operator (%):
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
        col = (col + right) % width;
    }
    return trees;
}
    // part one
    // slope: right 3, down 1
    const part1 = countTrees(3, 1);
    console.log(`Trees Encountered: ${part1}`);

    // part two
    // slopes to test
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    // multiply together the number of trees encountered on each slope
    let part2 = 1;

    for (const [right, down] of slopes) {
        part2 *= countTrees(right, down);
    }
    console.log(`Product Trees Encountered: ${part2}`);


