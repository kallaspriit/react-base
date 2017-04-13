import React from 'react';
import { Link } from 'react-router-dom';
import views from '../';

export default () => (
	<div className="index-view">
		<h1>Index view</h1>
		<ul className="menu">
			{Object.keys(views)
				.filter(viewName => ['index', 'not-found'].indexOf(viewName) === -1)
				.map(viewName => (
					<li key={viewName}>
						<Link to={`/view/${viewName}`}>{viewName}</Link>
					</li>
				))
			}

			<li>
				<Link to="/xxx">test non-existing url</Link>
			</li>
		</ul>
	</div>
);
