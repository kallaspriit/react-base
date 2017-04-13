import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

// get the root view and styles
import RootView from './views/RootView';
import './gfx/main.scss';

// renders the application to html root element
function renderApplication(application) {
	// render the application
	render(
		<AppContainer>
			<Router>
				{application}
			</Router>
		</AppContainer>,
		document.getElementById('root'),
	);
}

// render initial application
renderApplication(<RootView />);

// accept hot updates and re-render the application
if (module.hot) {
	module.hot.accept('./views/RootView', () => {
		const UpdatedRootView = require('./views/RootView').default; // eslint-disable-line global-require

		renderApplication(<UpdatedRootView />);
	});
}
