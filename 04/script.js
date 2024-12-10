import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8');
const grid = input.split('\r\n');
const word = 'XMAS';

const rows = grid.length;
const cols = grid[0].length;

function partOne() {
	let count = 0;

	const directions = [
		[0, 1], // Right
		[1, 0], // Down
		[1, 1], // Down-right
		[1, -1], // Down-left
		[0, -1], // Left (reverse)
		[-1, 0], // Up (reverse)
		[-1, -1], // Up-left (reverse)
		[-1, 1], // Up-right (reverse)
	];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			for (const [dx, dy] of directions) {
				if (checkWord(i, j, dx, dy)) {
					count++;
				}
			}
		}
	}
	return count;
}

function checkWord(x, y, dx, dy) {
	for (let k = 0; k < word.length; k++) {
		const nx = x + k * dx;
		const ny = y + k * dy;
		if (
			nx < 0 ||
			ny < 0 ||
			nx >= rows ||
			ny >= cols ||
			grid[nx][ny] !== word[k]
		) {
			return false;
		}
	}
	return true;
}

function partTwo() {
	let count = 0;
	const directions = [
		[-1, -1],
		[-1, 1],
		[1, -1],
		[1, 1],
	];

	for (let i = 1; i < rows - 1; i++) {
		for (let j = 1; j < cols - 1; j++) {
			if (grid[i][j] === 'A') {
				let masCount = 0;
				for (const [dx, dy] of directions) {
					if (checkMAS(i, j, dx, dy)) {
						masCount++;
					}
				}
				if (masCount === 2) {
					count++;
				}
			}
		}
	}
	return count;
}

function checkMAS(x, y, dx, dy) {
	let nx = x + dx;
	let ny = y + dy;

	if (grid[nx][ny] === 'M') {
		nx = x - dx;
		ny = y - dy;
		if (grid[nx][ny] === 'S') {
			return true;
		}
	}
	return false;
}

console.log('Part 1 count: ' + partOne());
console.log('Part 2 count: ' + partTwo());
