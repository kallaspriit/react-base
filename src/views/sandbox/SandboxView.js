import React from 'react';
import { Link, Route } from 'react-router-dom';
import { RouterMatchShape } from '../../constants/shapes';

import StatefulView from './children/stateful/StatefulView';
import ReduxView from './children/redux/ReduxView';
import SvgView from './children/svg/SvgView';
import GraphqlView from './children/graphql/GraphqlView';

const ExampleView = ({ match }) => (
	<div className="sandbox-view">
		<h1>Experiments sandbox</h1>
		<p>Edit this file in <strong>src/views/sandbox/SandboxView.js</strong></p>
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
			<li>
				<Link to={`${match.url}/graphql`}>Fetching data with GraphQL</Link>
			</li>
		</ul>
		<div className="child-view">
			<Route path={`${match.url}/stateful`} component={StatefulView} />
			<Route path={`${match.url}/redux`} component={ReduxView} />
			<Route path={`${match.url}/svg`} component={SvgView} />
			<Route path={`${match.url}/graphql`} component={GraphqlView} />
		</div>
	</div>
);

ExampleView.propTypes = {
	match: RouterMatchShape,
};

export default ExampleView;
