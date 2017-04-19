import { ApolloClient, createNetworkInterface } from 'react-apollo';

export default function(endpointUri) {
	// configure graphql network interface
	const networkInterface = createNetworkInterface({
		uri: endpointUri,
	});

	// configure graphql client
	return new ApolloClient({
		networkInterface,
	});
}
