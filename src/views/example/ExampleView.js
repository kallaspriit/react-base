import React from 'react';
import { Link, Route } from 'react-router-dom';
import { RouterMatchShape } from '../../constants/shapes';

import ExampleCounter from './children/counter/ExampleCounter';
import ExampleRedux from './children/redux/ExampleRedux';

const ExampleView = ({ match }) => (
	<div className="example-view">
		<h1>Example view</h1>
		<p>Edit this file in <strong>X:\projects\base\src\views\example\ExampleView.js</strong></p>
		<ul>
			<li>
				<Link to={`${match.url}/counter`}>Counter example based on state</Link>
			</li>
			<li>
				<Link to={`${match.url}/redux`}>Counter example based on redux store</Link>
			</li>
		</ul>
		<div className="child-view">
			<Route path={`${match.url}/counter`} component={ExampleCounter} />
			<Route path={`${match.url}/redux`} component={ExampleRedux} />
		</div>
	</div>
);

ExampleView.propTypes = {
	match: RouterMatchShape,
};

export default ExampleView;
