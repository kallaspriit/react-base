import glob from 'glob';
import path from 'path';
import paths from '../build/paths';

// find the resolvers and merge them into a single object
const globPattern = path.join(paths.server, 'resolvers', '**/*.js');
const filenames = glob.sync(globPattern);
const resolvers = filenames
	.map(filename => require(filename).default) // eslint-disable-line global-require, import/no-dynamic-require
	.reduce((result, resolver) => ({ ...result, ...resolver }), {});

// return resolvers
export default resolvers;
