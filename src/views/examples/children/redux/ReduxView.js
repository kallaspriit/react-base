import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as reduxActions from './reduxActions';

const ReduxView = ({
	counter,
	incrementCounter,
}) => (
	<div className="example-redux">
		<h2>Counter example based on redux store</h2>
		<p>Counter: {counter}</p>
		<button onClick={() => incrementCounter()}>Increment counter</button>
	</div>
);

ReduxView.propTypes = {
	counter: PropTypes.number.isRequired,
	incrementCounter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ reduxReducer }) => ({
	counter: reduxReducer.counter,
});

const matchDispatchToProps = {
	...reduxActions,
};

export default connect(mapStateToProps, matchDispatchToProps)(
	ReduxView,
);
