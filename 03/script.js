import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8');

function partOne() {
	const mulPattern = /mul\(\d+,\d+\)/g;
	const matches = input.match(mulPattern);

	let results = 0;

	matches.map((entry) => {
		const numbers = entry.match(/\d+/g).map(Number);
		results += numbers[0] * numbers[1];
	});

	console.log('Part 1: ' + results);
}

function partTwo() {
	const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
	let enabled = true;
	let sum = 0;
	let match;

	while ((match = regex.exec(input)) !== null) {
		const [fullMatch, x, y] = match;

		if (fullMatch === 'do()') {
			enabled = true;
		} else if (fullMatch === "don't()") {
			enabled = false;
		} else if (x !== undefined && y !== undefined) {
			if (enabled) {
				sum += parseInt(x) * parseInt(y);
			}
		}
	}

	console.log('Part 2: ' + sum);
}

partOne();
partTwo();
