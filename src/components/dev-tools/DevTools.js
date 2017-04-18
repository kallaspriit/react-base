/* eslint-disable no-console */

import React, { Component } from 'react';
import ViewsMenu from '../views-menu/ViewsMenu';
import { post } from '../../services/fetch';
import './dev-tools.scss';

export function createView({
	name,
}) {
	console.log('create view', name);

	const url = 'http://localhost:9991/create-view';

	return post(url, {
		name,
	});
}

export default class DevTools extends Component {

	state = {
		viewName: '',
		error: null,
	};

	render = () => (
		<div className="dev-tools">
			<div className="dev-tools__wrapper">
				<section className="dev-tools__top">
					<h1>Views</h1>
					<ViewsMenu />
				</section>
				<section className="dev-tools__bottom">
					<form className="generator-form" onSubmit={this.handleCreateViewSubmit}>
						{this.state.error ? <div className="generator-form__error">{this.state.error}</div> : null}
						<input
							id="dev-tools-view-name"
							name="viewName"
							placeholder="Enter view name"
							className="generator-form__textfield"
							value={this.state.viewName}
							onChange={this.handleValueChange}
						/>
						<button type="submit" className="generator-form__button">Create view</button>
					</form>
				</section>
			</div>
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
		}).then((response) => {
			console.log('view created', response);
		}).catch((error) => {
			console.error('creating view failed', error.message);

			this.setState({
				error: error.message,
			});
		});

		this.setState({
			viewName: '',
			error: null,
		});
	}
}
