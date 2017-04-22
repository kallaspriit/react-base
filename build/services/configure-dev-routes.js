import configureDevServer from './configure-dev-server';
import configureGraphqlServer from '../../server/services/configure-server';

export default function(router, graphqlContext) {
	// configure development server endpoints (/dev/*)
	configureDevServer(router);

	// configure GraphQL server
	configureGraphqlServer(router, graphqlContext);
}
