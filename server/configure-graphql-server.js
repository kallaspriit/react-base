import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import formatGraphqlError from './services/format-graphql-error';
import resolveViewer from './services/resolve-viewer';

export default function configureGraphqlServer(app) {
	let schema;
	let resolver;
	let Database;

	// dev server has already invalidated the caches; don't crash the server if schema is invalid
	try {
		schema = require('./services/get-schema').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' SCHEMA ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	// don't crash the server if the hot-reloaded resolver is invalid
	try {
		resolver = require('./services/get-resolvers').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' RESOLVER ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	// don't crash the server if the hot-reloaded database is invalid
	try {
		Database = require('./services/database').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' DATABASE ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	const database = new Database();

	// configure the graphql middleware using the function syntax to exptract data from the request to context
	// http://dev.apollodata.com/tools/graphql-server/setup.html#options-function
	app.use('/graphql', graphqlExpress((request) => {
		const viewer = resolveViewer(request);
		const session = request.session;

		return {
			schema,
			context: {
				viewer,
				database,
				session, // TODO should we provide the raw session at all?
			},
			rootValue: resolver,
			formatError: formatGraphqlError,
		};
	}));

	// also add graphiql interface (TODO limit to dev-mode only? or make it configurable?)
	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
	}));
}
