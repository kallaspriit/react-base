import React from 'react';
import Markdown from 'react-markdown';
import ViewsMenu from '../../components/views-menu/ViewsMenu';
import readmeContents from '../../../README.md';
import './readme-views.scss';

export default () => (
	<div className="readme-view">
		<h1>Welcome!</h1>
		<p>
			This view contents is served from <strong>src/views/readme/ReadmeView.js</strong>, feel free to change it!
		</p>
		<p>
			If you started this as a development server (<code>npm start</code>),
			any changes should appear immediately without needing to reload.
		</p>
		<p>
			This default route is defined in <strong>src/App.js</strong> which holds the root routes.
		</p>

		<h2>Views</h2>
		<ViewsMenu />

		<Markdown source={readmeContents} className="readme" />
	</div>
);
