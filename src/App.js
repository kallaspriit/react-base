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
			<Route exact path="/" component={IndexView} />
			<Route path="/uig" component={UigView} />

			{/* add automatic /view/.. routes */}
			{Object.keys(views)
				.filter(viewName => ['index', 'not-found'].indexOf(viewName) === -1)
				.map(viewName => (
					<Route key={viewName} path={`/view/${viewName}`} component={views[viewName]} />
				))
			}

			<Route component={NotFoundView} />
		</Switch>
		{createDevTools()}
	</div>
);
