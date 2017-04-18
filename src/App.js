import React from 'react';
import { Switch, Route } from 'react-router-dom';
import views from './views';

import IndexView from './views/index/IndexView';
import UigView from './views/uig/UigView';
import NotFoundView from './views/not-found/NotFoundView';

import createDevTools from './components/dev-tools';

export default () => (
	<div className="app">
		<Switch>
			{/* custom routes */}
			<Route exact path="/" component={IndexView} />
			<Route path="/uig" component={UigView} />

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
