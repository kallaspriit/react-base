import configureDevServer from './configure-dev-server';
import configureGraphqlServer from '../../server/services/configure-server';

export default function(router) {
	// configure development server endpoints (/dev/*)
	configureDevServer(router);

	// configure GraphQL server
	configureGraphqlServer(router);
}
