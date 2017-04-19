import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as exampleReduxActions from './example-redux-actions';

const ExampleRedux = ({
	counter,
	incrementCounter,
}) => (
	<div className="example-redux">
		<h2>Counter example based on redux store</h2>
		<p>Counter: {counter}</p>
		<button onClick={() => incrementCounter()}>Increment counter</button>
	</div>
);


ExampleRedux.propTypes = {
	counter: PropTypes.number.isRequired,
	incrementCounter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ exampleReduxReducer }) => ({
	counter: exampleReduxReducer.counter,
});

const matchDispatchToProps = {
	...exampleReduxActions,
};

export default connect(mapStateToProps, matchDispatchToProps)(
	ExampleRedux,
);
