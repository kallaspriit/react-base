import React from 'react';
import { Switch, Route } from 'react-router-dom';
import views from './';

import IndexView from './index/IndexView';
import UigView from './uig/UigView';
import NotFoundView from './not-found/NotFoundView';

export default () => (
	<div className="app">
		<Switch>
			<Route exact path="/" component={IndexView} />
			<Route path="/uig" component={UigView} />

			{Object.keys(views)
				.filter(viewName => ['index', 'not-found'].indexOf(viewName) === -1)
				.map(viewName => (
					<Route key={viewName} path={`/view/${viewName}`} component={views[viewName]} />
				))
			}

			<Route component={NotFoundView} />
		</Switch>
	</div>
);
