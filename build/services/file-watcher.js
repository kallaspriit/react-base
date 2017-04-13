/* eslint-disable no-console */

import gaze from 'gaze';

export default (pattern, callback) => {
	gaze(pattern, (error, watcher) => {
		if (error) {
			console.error(`gaze failed (${error})`);

			return;
		}

		watcher.on('all', callback);
	});
};
