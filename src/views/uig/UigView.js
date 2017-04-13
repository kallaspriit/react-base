import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

const ComponentRenderer = ({ match }) => (
	<div className="component">
		<h2>Component &quot;{match.params.component}&quot;</h2>
	</div>
);

const UigView = ({ match }) => (
	<div className="uig-view">
		<h1>UIG ({match.url})</h1>
		<ul className="menu">
			<li>
				<Link to={`${match.url}/checkbox`}>Checkbox</Link>
			</li>
		</ul>
		<Route path={`${match.url}/:component`} component={ComponentRenderer} />
		<Link to="/">Navigate to index</Link>
	</div>
);

ComponentRenderer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.object.isRequired,
		isExact: PropTypes.bool.isRequired,
		path: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired,
};

UigView.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.object.isRequired,
		isExact: PropTypes.bool.isRequired,
		path: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired,
};

export default UigView;
