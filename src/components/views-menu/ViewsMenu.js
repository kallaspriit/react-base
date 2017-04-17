import React from 'react';
import { Link } from 'react-router-dom';
import changeCase from 'change-case';
import views from '../../views';

export default () => (
	<ul className="views-menu">
		{Object.keys(views)
			.filter(viewName => ['index', 'not-found'].indexOf(viewName) === -1)
			.map(viewName => (
				<li key={viewName}>
					<Link to={`/view/${viewName}`}>{changeCase.sentenceCase(viewName)}</Link>
				</li>
			))
		}
	</ul>
);
