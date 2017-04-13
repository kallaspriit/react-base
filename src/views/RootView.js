import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IndexView from './index/IndexView';
import UigView from './uig/UigView';
import NotFoundView from './not-found/NotFoundView';

export default () => (
	<div className="app">
		<Switch>
			<Route exact path="/" component={IndexView} />
			<Route path="/uig" component={UigView} />
			<Route component={NotFoundView} />
		</Switch>
	</div>
);
