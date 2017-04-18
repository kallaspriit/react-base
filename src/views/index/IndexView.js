import React from 'react';
import Markdown from 'react-markdown';
import ViewsMenu from '../../components/views-menu/ViewsMenu';
import readmeContents from '../../../README.md';
import './index-views.scss';

export default () => (
	<div className="index-view">
		<h1>Welcome!</h1>
		<p>This view contents is served from <strong>src/views/index/IndexView.js</strong>, feel free to change it!</p>
		<p>
			If you started this as a development server (<strong>npm start</strong>),
			any changes should appear immediately without needing to reload.
		</p>

		<h2>Views</h2>
		<ViewsMenu />

		<h2>Readme</h2>
		<Markdown source={readmeContents} className="readme" />
	</div>
);
