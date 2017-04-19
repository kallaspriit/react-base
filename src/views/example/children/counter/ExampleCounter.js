import React, { Component } from 'react';

export default class ExampleCounter extends Component {

	state = {
		counter: 0,
	};

	render = () => (
		<div className="counter-view">
			<h2>Counter</h2>
			<p>Counter: {this.state.counter}</p>
			<button onClick={this.handleIncrementCounter}>Increment counter</button>
		</div>
	);

	handleIncrementCounter = () => {
		this.setState({
			counter: this.state.counter + 1,
		});
	}
}
