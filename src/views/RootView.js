import React from 'react';
import { Route } from 'react-router-dom';

import IndexView from './index/IndexView';

export default () => (
	<div className="app">
		<Route exact path="/" component={IndexView} />
	</div>
);
