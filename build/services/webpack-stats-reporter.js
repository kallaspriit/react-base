/* eslint-disable no-console */

function logMessage(number, message) {
	const lines = message.split(/\n/);

	console.error(`${number} - ${lines[0].bold}`);
	console.error(lines.splice(1).map(line => `> ${line}`).join('\n'));
	console.log('');
}

export default function(stats) {
	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.log(`${' ERROR '.bgRed.black}`);

		info.errors.forEach((message, index) => {
			logMessage(index + 1, message);
		});
	} else if (stats.hasWarnings()) {
		console.log(`${' WARN '.bgYellow.black}`);

		info.warnings.forEach((message, index) => {
			logMessage(index + 1, message);
		});
	} else {
		return true;
	}

	return false;
}
