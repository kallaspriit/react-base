import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './services/configure-store';

// get the root view and styles
import App from './App';
import './gfx/main.scss';

const store = configureStore();

// renders the application to html root element
function renderApplication(application) {
	// render the application
	render(
		<AppContainer>
			<Provider store={store}>
				<Router>
					{application}
				</Router>
			</Provider>
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
