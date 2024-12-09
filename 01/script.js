import fs from 'fs';

function getInputValues(input) {
	const lines = input.trim().split('\n');

	const left = [];
	const right = [];

	lines.forEach((line) => {
		const [leftCol, rightCol] = line.split(/\s+/).map(Number);

		left.push(leftCol);
		right.push(rightCol);
	});

	return { left, right };
}

function sortArrays(columns) {
	const { left, right } = columns;

	left.sort((a, b) => a - b);
	right.sort((a, b) => a - b);

	return { left, right };
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

function calcSimilarity(columns) {
	const { left, right } = columns;

	let totalSimilarity = 0;

	left.forEach((num) => {
		const count = right.filter((val) => val === num).length;
		totalSimilarity += num * count;
	});
	return totalSimilarity;
}

const input = getInputValues(fs.readFileSync('./input.txt', 'utf-8'));

// Part one
const sortedInput = sortArrays(input);
const diff = calculateDifference(sortedInput);

console.log('The total difference is: ' + diff);

// Part two
const similarity = calcSimilarity(input);

console.log('The similarity is: ' + similarity);
