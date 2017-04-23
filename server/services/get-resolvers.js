import glob from 'glob';
import path from 'path';
import paths from '../../build/paths';

// find the resolvers and merge them into a single object
const globPattern = path.join(paths.server, 'resolvers', '**/*.js');
const filenames = glob.sync(globPattern);
const resolver = filenames
	.map(filename => require(filename).default) // eslint-disable-line global-require, import/no-dynamic-require
	.reduce((result, info) => ({ ...result, ...info }), {});

// return the root resolver
export default resolver;
