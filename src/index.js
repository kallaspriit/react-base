import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
// import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import configureStore from './services/configure-store';

// get the root view and styles
import App from './App';
import './gfx/main.scss';

// configure redux store
const store = configureStore();

// TODO this should be possible to enter in UI
const token = '';

// configure graphql network interface
const networkInterface = createNetworkInterface({
	uri: 'https://api.github.com/graphql',
});

// configure graphql middleware to provide authorization token
networkInterface.use([{
	applyMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {};
		}

		req.options.headers.authorization = `Bearer ${token}`;

		next();
	},
}]);

// configure graphql client
const graphqlClient = new ApolloClient({
	networkInterface,
});

// renders the application to html root element
function renderApplication(application) {
	// render the application
	render(
		<AppContainer>
			{/* <Provider store={store}> */}
			<ApolloProvider client={graphqlClient} store={store}>
				<Router>
					{application}
				</Router>
			</ApolloProvider>
			{/* </Provider> */}
		</AppContainer>,
		document.getElementById('root'),
	);
}

// render initial application
renderApplication(<App />);

// accept hot updates and re-render the application
if (module.hot) {
	module.hot.accept('./App', () => {
		const UpdatedRootView = require('./App').default; // eslint-disable-line global-require

		renderApplication(<UpdatedRootView />);
	});
}
