import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
	<div className="index-view">
		<h1>Index</h1>
		<ul className="menu">
			<li>
				<Link to="/uig">UIG</Link>
			</li>
			<li>
				<Link to="/xxx">Non-existing URL</Link>
			</li>
		</ul>
	</div>
);
