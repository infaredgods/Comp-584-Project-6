// import Node.js File System module to read files
// documentation: https://nodejs.org/api/fs.html
const fs = require('fs');

// read input file
const input = fs.readFileSync('input4.txt', 'utf8');

// normalize windows line endings
const normalizedInput = input.replace(/\r\n/g, '\n');

// split passports by blank lines
// string.prototype.split:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
const passports = normalizedInput.split(/\n{2,}/);

const REQUIRED_FIELDS = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

let part1Valid = 0;
let part2Valid = 0;

// convert passport text into an object
function parsePassport(passportText) {
    const fields = passportText.replace(/\n/g, ' ').trim().split(' ');
    const passport = {};

    fields.forEach(field => {
        const [key, value] = field.split(':');
        passport[key] = value;
    });

    return passport;
}

// validate passport for part 2 
function isValidPart2(p) {
    // byr
    if (!/^\d{4}$/.test(p.byr) || p.byr < 1920 || p.byr > 2002) return false;

    // iyr
    if (!/^\d{4}$/.test(p.iyr) || p.iyr < 2010 || p.iyr > 2020) return false;

    // eyr
    if (!/^\d{4}$/.test(p.eyr) || p.eyr < 2020 || p.eyr > 2030) return false;

    // hgt
    const match = p.hgt.match(/^(\d+)(cm|in)$/);
    if (!match) return false;

    const value = Number(match[1]);
    const unit = match[2];

    if (unit === 'cm' && (value < 150 || value > 193)) return false;
    if (unit === 'in' && (value < 59 || value > 76)) return false;

    // hcl
    if (!/^#[0-9a-f]{6}$/.test(p.hcl)) return false;

    // ecl
    if (!/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(p.ecl)) return false;

    // pid
    if (!/^\d{9}$/.test(p.pid)) return false;

    return true;
}

// process passports
for (const passportText of passports) {
    if (!passportText.trim()) continue;

    const passport = parsePassport(passportText);

    // part 1: field presence
    // Array.prototype.every:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    const hasAllRequired = REQUIRED_FIELDS.every(field => passport[field]);

    if (hasAllRequired) {
        part1Valid++;

        // part 2: strict validation
        if (isValidPart2(passport)) {
            part2Valid++;
        }
    }
}
// output for part 1
console.log('Valid passports:', part1Valid);

// output for part 2
console.log('Valid passports:', part2Valid);
