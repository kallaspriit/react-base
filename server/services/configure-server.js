import graphqlMiddleware from 'express-graphql';

export default function configureServer(app) {
	// dev server has already invalidated the caches
	const schema = require('../schema').default; // eslint-disable-line global-require
	const resolver = require('../resolver').default; // eslint-disable-line global-require

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

	return middleware;
}
