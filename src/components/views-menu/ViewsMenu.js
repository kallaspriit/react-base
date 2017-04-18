import React from 'react';
import { Link } from 'react-router-dom';
import changeCase from 'change-case';
import views from '../../views';

const hiddenViews = ['not-found'];

export default () => (
	<ul className="views-menu">
		{Object.keys(views)
			.filter(viewName => hiddenViews.indexOf(viewName) === -1)
			.sort()
			.map(viewName => (
				<li key={viewName}>
					<Link to={`/view/${viewName}`}>{changeCase.sentenceCase(viewName)}</Link>
				</li>
			))
		}
	</ul>
);
