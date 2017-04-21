import React from 'react';
import { Switch, Route } from 'react-router-dom';
import views from './views';
import createDevTools from './components/dev-tools/create-dev-tools';

// views used in root routes
import ReadmeView from './views/readme/ReadmeView';
import NotFoundView from './views/not-found/NotFoundView';

// generates automatic /view/... routes based on the generated src/views/index.js index file
function generateAutomaticRoutes() {
	return Object.keys(views)
		.map(viewName => (
			<Route key={viewName} path={`/view/${viewName}`} component={views[viewName]} />
		));
}

// root application component
export default () => (
	<div className="app">
		<Switch>
			<Route exact path="/" component={ReadmeView} />

			{generateAutomaticRoutes()}
			<Route component={NotFoundView} />
		</Switch>
		{createDevTools()}
	</div>
);
