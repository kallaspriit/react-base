import { ApolloClient, createNetworkInterface } from 'react-apollo';

export default function(endpointUri) {
	// configure graphql network interface
	const networkInterface = createNetworkInterface({
		uri: endpointUri,
		opts: {
			// send cookies used for session
			credentials: 'same-origin',
		},
	});

	// configure graphql client
	return new ApolloClient({
		networkInterface,
		connectToDevTools: true, // https://github.com/apollographql/apollo-client-devtools
	});
}
