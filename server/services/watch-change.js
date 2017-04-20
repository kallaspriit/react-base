import { watch } from 'chokidar';

export default function watchChange(pattern, changeCallback) {
	const watcher = watch(pattern, {
		ignoreInitial: true,
	});

	// TODO consider other changes such as added/removed files and dirs?
	watcher.on('all', () => {
		changeCallback();
	});
}
