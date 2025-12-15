const fs = require('fs');
const path = require('path');

const expenseReport = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')

// split the file contents into an array of strings using newline characters,
// then convert each string into a Number
// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// map(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// Number(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
const expenses = expenseReport.split('\n').map(Number);
// log the raw file contents (string) for debugging
console.log(expenseReport);
// log the parsed array of numbers for debugging 
console.log(expenses);
// variable to store the final answer for part one
let answerPartOne;

// outer loop: iterate through each expense
// standard for-loop documentation:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
for (let i = 0; i < expenses.length; i++) {
    // select the first expense
    const firstExpense = expenses[i];

    // inner loop: check every expense after the current one
    // starts at i + 1 to avoid duplicate pairs and self-pairing
    for (let j = i + 1; j < expenses.length; j++) {
        // select the second expense
        const secondExpense = expenses[j];
        // check if the two expenses sum to 2020
        if (firstExpense + secondExpense === 2020) {
            // multiply the two expenses to get the answer
            answerPartOne = firstExpense * secondExpense;
            // log the matching values
            console.log(`i = ${firstExpense} j = ${secondExpense}`);
            // log the final answer
            console.log(answerPartOne);
            // exit the inner loop once a valid pair is found
            break;
        }
    }
    // if a final answer has been found, exit the outer loop
    if (answerPartOne) {
        break;
    }
}

// same implementation for part two, but with three nested loops
let answerPartTwo;

for (let i = 0; i < expenses.length; i++) {
    const first = expenses[i];

    for (let j = i + 1; j < expenses.length; j++) {
        const second = expenses[j];

        for (let k = j + 1; k < expenses.length; k++) {
            const third = expenses[k];

            // Check if the three numbers add up to 2020
            if (first + second + third === 2020) {
                answerPartTwo = first * second * third;

                console.log(`Found: ${first}, ${second}, ${third}`);
                console.log(`Product: ${answerPartTwo}`);
                break;
            }
        }

        if (answerPartTwo) break;
    }

    if (answerPartTwo) break;
}
