import React from 'react';

export default () => (
	<div className="${scope.name.param}-view">
		<h1>${scope.name.sentence} view</h1>
		<p>Edit this file in <strong>${scope.filename.original}</strong></p>
	</div>
);
