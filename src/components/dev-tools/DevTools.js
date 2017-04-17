import React, { Component } from 'react';

export function createView({
	name,
}) {
	console.log('create view', name);

	const url = 'http://localhost:9991/create-view';

	fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => {
		console.log('view created', response);
	}).catch((error) => {
		console.error('creating view failed', error);
	});
}

export default class DevTools extends Component {

	state = {
		viewName: '',
	};

	render = () => (
		<div className="dev-tools">
			<form onSubmit={this.handleCreateViewSubmit}>
				<label htmlFor="dev-tools-view-name">View name</label>
				<input
					id="dev-tools-view-name"
					placeholder="Enter view name"
					name="viewName"
					value={this.state.viewName}
					onChange={this.handleValueChange}
				/>
				<button type="submit">Create view</button>
			</form>
		</div>
	)

	handleValueChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	handleCreateViewSubmit = (e) => {
		e.preventDefault();

		createView({
			name: this.state.viewName,
		});

		this.setState({
			viewName: '',
		});
	}
}
