import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

// something to change..
let counter = 1;

export default new GraphQLSchema({
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
