import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8');

function getReports(input) {
	const rows = input.trim().split('\r\n');

	let reports = [];

	rows.forEach((row) => {
		const rowArray = row.split(/\s+/).map(Number);
		reports.push(rowArray);
	});

	return reports;
}

function checkAmountofSafeReports(reports, isPartTwo) {
	let safeReports = 0;

	reports.forEach((report) => {
		if (isReportSafe(report) || (problemDampener(report) && isPartTwo))
			safeReports++;
	});

	return safeReports;
}

function isReportSafe(report) {
	let direction = null;

	for (let i = 0; i < report.length - 1; i++) {
		const diff = Math.abs(report[i] - report[i + 1]);
		if (diff < 1 || diff > 3) return false;

		if (report[i] < report[i + 1]) {
			if (direction === null) {
				direction = 'increase';
			} else if (direction === 'decrease') {
				return false;
			}
		} else if (report[i] > report[i + 1]) {
			if (direction === null) {
				direction = 'decrease';
			} else if (direction === 'increase') {
				return false;
			}
		}
	}
	return true;
}

function problemDampener(report) {
	for (let i = 0; i < report.length; i++) {
		const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
		if (isReportSafe(modifiedReport)) return true;
	}
	return false;
}

const reports = getReports(input);

// Part One
const checkedReports = checkAmountofSafeReports(reports, false);
console.log('Number of safe reports: ' + checkedReports);

// Part two
const checkedReportsWithPD = checkAmountofSafeReports(reports, true);
console.log(
	'Number of safe reports with Problem Dampener: ' + checkedReportsWithPD
);
