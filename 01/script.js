import fs from 'fs';

function getInputValues(input) {
	const lines = input.trim().split('\n');

	const leftColumn = [];
	const rightColumn = [];

	lines.forEach((line) => {
		const [left, right] = line.split(/\s+/).map(Number);

		leftColumn.push(left);
		rightColumn.push(right);
	});

	return { leftColumn, rightColumn };
}

function sortArrays(columns) {
	const { leftColumn, rightColumn } = columns;

	leftColumn.sort((a, b) => a - b);
	rightColumn.sort((a, b) => a - b);

	return { left: leftColumn, right: rightColumn };
}

function calculateDifference(columns) {
	const { left, right } = columns;
	const length = left.length;

	let totalDifference = 0;

	for (let i = 0; i < length; i++) {
		const diff = Math.abs(left[i] - right[i]);
		totalDifference += diff;
	}
	return totalDifference;
}

const input = getInputValues(fs.readFileSync('./input.txt', 'utf-8'));
const sortedInput = sortArrays(input);
const diff = calculateDifference(sortedInput);

console.log('The total difference is: ' + diff);
