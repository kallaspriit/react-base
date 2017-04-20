/* eslint-disable no-console */

import { watch } from 'chokidar';

export default function(pattern, changeCallback) {
	const watcher = watch(pattern, {
		ignoreInitial: true,
	});

	// TODO consider other changes such as added/removed files and dirs?
	watcher.on('change', (filename) => {
		console.log(`file ${filename} changed`);

		changeCallback();
	});
}
