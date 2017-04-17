import React from 'react';

export default function createDevTools() {
	// the development environment code is optimized away for production build
	if (process.env.NODE_ENV !== 'production') {
		const DevTools = require('./DevTools').default; // eslint-disable-line global-require

		return <DevTools />;
	}

	return null;
}
