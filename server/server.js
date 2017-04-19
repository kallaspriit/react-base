/* eslint-disable no-console */

import express from 'express';
import cors from 'cors';
import opn from 'opn';
import graphqlMiddleware from 'express-graphql';
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import 'colors';

// export as function so other resources could start it
export default function startServer(config) {
	// create express server
	const app = express();

	// enable cors
	app.use(cors());

	// something to change..
	let counter = 1;

	// define schema
	const schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'RootQueryType',
			fields: {
				message: {
					type: GraphQLString,
					resolve() {
						return `Hello GraphQL #${counter++}`;
					},
				},
			},
		}),
	});

	// create the graphql endpoint
	app.use(config.endpoint, graphqlMiddleware({
		schema,
		graphiql: true,
	}));

	// start the server
	app.listen(config, () => {
		opn(config.url);

		console.log(`GraphQL server started at ${config.url.bold}`);
	});
}
