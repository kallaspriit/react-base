// import cors from 'cors';
import graphqlMiddleware from 'express-graphql';

export default function configureServer(app) {
	// get the latest schema and resolver, invalidate the require cache
	delete require.cache[require.resolve('../schema')];
	delete require.cache[require.resolve('../resolver')];
	const schema = require('../schema').default; // eslint-disable-line global-require
	const resolver = require('../resolver').default; // eslint-disable-line global-require

	// enable cors
	// app.use(cors());

	// create the graphql endpoint
	app.use('/graphql', graphqlMiddleware({
		schema,
		rootValue: resolver,
		graphiql: true,
		formatError: error => ({ // TODO dev only
			message: error.message,
			locations: error.locations,
			stack: error.stack,
			path: error.path,
		}),
	}));

	return app;
}
