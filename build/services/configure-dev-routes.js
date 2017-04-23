import configureDevTools from './configure-dev-tools';
import configureGraphqlServer from '../../server/configure-graphql-server';

export default function(router, graphqlContext) {
	// configure development server endpoints (/dev/*)
	configureDevTools(router);

	// configure GraphQL server
	configureGraphqlServer(router, graphqlContext);
}
