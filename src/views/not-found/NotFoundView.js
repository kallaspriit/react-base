import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
	<div className="not-found-view">
		<h1>Page not found</h1>
		<Link to="/">Navigate to index</Link>
	</div>
);
