import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import configureStore from './services/configure-store';
import configureGraphql from './services/configure-graphql';

// get the root view and styles
import App from './App';
import './gfx/main.scss';

// configure dependencies
const store = configureStore();
const client = configureGraphql('/graphql');

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

// render initial application
renderApplication(<App />);

// accept hot updates and re-render the application
if (module.hot) {
	module.hot.accept('./App', () => {
		const UpdatedRootView = require('./App').default; // eslint-disable-line global-require

		renderApplication(<UpdatedRootView />);
	});
}
