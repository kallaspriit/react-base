import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import configureStore from './services/configure-store';
import configureGraphqlClient from './services/configure-graphql-client';

// get the root view and styles
import './gfx/main.scss';
import App from './App';

// configure dependencies
const store = configureStore();
const client = configureGraphqlClient();

// renders the application to html root element
function renderApplication(application) {
	// render the application (ApolloProvider is also a redux provider)
	render(
		<AppContainer>
			<ApolloProvider client={client} store={store}>
				<Router>
					{application}
				</Router>
			</ApolloProvider>
		</AppContainer>,
		document.getElementById('root'),
	);
}

// delay rendering the application in dev mode to avoid flash of unstyled content (CSS is in JS)
if (process.env.NODE_ENV === 'development') {
	setTimeout(() => {
		renderApplication(<App />);
	}, 100);
} else {
	renderApplication(<App />);
}

// accept hot updates and re-render the application
if (module.hot) {
	module.hot.accept('./App', () => {
		const UpdatedRootView = require('./App').default; // eslint-disable-line global-require

		renderApplication(<UpdatedRootView />);
	});
}
