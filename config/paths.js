import path from 'path';

export function resolve(...relative) {
	return path.resolve(__dirname, '..', ...relative);
}

export default {
	context: resolve('.'),
	src: resolve('src'),
	config: resolve('config'),
	dist: resolve('dist'),
	gfx: resolve('src', 'gfx'),
	entry: resolve('src', 'index.js'),
	indexHtml: resolve('src', 'index.html'),
};
