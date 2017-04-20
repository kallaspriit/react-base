import path from 'path';

export function resolve(...relative) {
	return path.resolve(__dirname, '..', ...relative);
}

export default {
	context: resolve('.'),
	src: resolve('src'),
	config: resolve('config'),
	dist: resolve('dist'),
	server: resolve('server'),
	buildTemplates: resolve('build', 'templates'),
	gfx: resolve('src', 'gfx'),
	components: resolve('src', 'components'),
	views: resolve('src', 'views'),
	entry: resolve('src', 'index.js'),
	indexHtml: resolve('src', 'index.html'),
};
