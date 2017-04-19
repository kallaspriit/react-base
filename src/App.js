import React from 'react';
import { Switch, Route } from 'react-router-dom';
import views from './views';

import ReadmeView from './views/readme/ReadmeView';
import NotFoundView from './views/not-found/NotFoundView';

import createDevTools from './components/dev-tools';

export default () => (
	<div className="app">
		<Switch>
			{/* custom routes */}
			<Route exact path="/" component={ReadmeView} />

			{/* automatic /view/.. routes */}
			{Object.keys(views)
				.map(viewName => (
					<Route key={viewName} path={`/view/${viewName}`} component={views[viewName]} />
				))
			}

			{/* 404 not found route */}
			<Route component={NotFoundView} />
		</Switch>
		{createDevTools()}
	</div>
);
