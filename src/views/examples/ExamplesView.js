import React from 'react';
import { Link, Route } from 'react-router-dom';
import { RouterMatchShape } from '../../constants/shapes';

import StatefulView from './children/stateful/StatefulView';
import ReduxView from './children/redux/ReduxView';
import SvgView from './children/svg/SvgView';

const ExampleView = ({ match }) => (
	<div className="examples-view">
		<h1>Examples view</h1>
		<p>Edit this file in <strong>X:\projects\base\src\views\examples\ExamplesView.js</strong></p>
		<ul>
			<li>
				<Link to={`${match.url}/stateful`}>Counter example based on state</Link>
			</li>
			<li>
				<Link to={`${match.url}/redux`}>Counter example based on redux store</Link>
			</li>
			<li>
				<Link to={`${match.url}/svg`}>Embedding SVG image</Link>
			</li>
		</ul>
		<div className="child-view">
			<Route path={`${match.url}/stateful`} component={StatefulView} />
			<Route path={`${match.url}/redux`} component={ReduxView} />
			<Route path={`${match.url}/svg`} component={SvgView} />
		</div>
	</div>
);

ExampleView.propTypes = {
	match: RouterMatchShape,
};

export default ExampleView;
