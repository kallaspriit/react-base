import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import formatGraphqlError from './format-graphql-error';

export default function configureServer(app) {
	let schema;
	let resolver;

	// dev server has already invalidated the caches; don't crash the server if schema is invalid
	try {
		schema = require('../schema').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' SCHEMA ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	// don't crash the server if the hot-reloaded resolver is invalid
	try {
		resolver = require('../resolver').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' RESOLVER ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	// configure the graphql middleware using the function syntax to exptract data from the request to context
	// http://dev.apollodata.com/tools/graphql-server/setup.html#options-function
	app.use('/graphql', graphqlExpress(request => ({
		schema,
		context: {
			session: request.session,
		},
		rootValue: resolver,
		formatError: formatGraphqlError,
	})));

	// also add graphiql interface (TODO limit to dev-mode only? or make it configurable?)
	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
	}));
}
