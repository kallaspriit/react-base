import graphqlMiddleware from 'express-graphql';

export default function configureServer(app) {
	let schema;
	let resolver;

	// dev server has already invalidated the caches
	try {
		schema = require('../schema').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' SCHEMA ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	try {
		resolver = require('../resolver').default; // eslint-disable-line global-require
	} catch (e) {
		console.error(`${' RESOLVER ERROR '.bgRed.black} ${e.message.bold}`);

		e.stack.split('\n').forEach((line) => {
			console.error(`> ${line}`);
		});

		return;
	}

	const middleware = graphqlMiddleware({
		schema,
		rootValue: resolver,
		graphiql: true,
		formatError: error => ({ // TODO dev only
			message: error.message,
			locations: error.locations,
			stack: error.stack,
			path: error.path,
		}),
	});

	// create the graphql endpoint
	app.use('/graphql', middleware);
}
