import { ApolloClient, createNetworkInterface } from 'react-apollo';

export default function configureGraphqlClient() {
	// configure graphql network interface
	const networkInterface = createNetworkInterface({
		uri: '/graphql',
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
