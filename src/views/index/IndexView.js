import React from 'react';
import Markdown from 'react-markdown';
import ViewsMenu from '../../components/views-menu/ViewsMenu';
import readmeContents from '../../../README.md';

export default () => (
	<div className="index-view">
		<h1>Welcome!</h1>
		<p>This view contents is served from <strong>src/views/index/IndexView.js</strong>.</p>
		<p>
			Feel free to change it. If you started this as a development server (<strong>npm run dev</strong>),
			any changes should appear immediately without needing to reload.
		</p>
		<h2>Views</h2>
		<ViewsMenu />
		<Markdown source={readmeContents} />
	</div>
);
