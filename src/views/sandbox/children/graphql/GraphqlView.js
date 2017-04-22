import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

export class GraphqlView extends Component { // eslint-disable-line react/prefer-stateless-function

	render = () => {
		const {
			loading: isLoading,
			error,
			sandbox,
		} = this.props.data;

		if (error) {
			return (
				<p className="error">
					{error.message}
				</p>
			);
		} else if (isLoading) {
			return (
				<p>loading...</p>
			);
		}

		return (
			<div className="graphql-view">
				<h1>Graphql example</h1>
				<p><strong>message:</strong> {sandbox.message}</p>
				<p><strong>session counter:</strong> {sandbox.session}</p>
				<p>
					<button onClick={() => this.props.data.refetch()}>Refetch</button>
				</p>
			</div>
		);
	}
}

GraphqlView.propTypes = {
	data: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		refetch: PropTypes.func.isRequired,
		error: PropTypes.object,
		sandbox: PropTypes.shape({
			message: PropTypes.string.isRequired,
			session: PropTypes.number.isRequired,
		}),
	}),
};

export default graphql(gql`
	query {
		sandbox {
			message
			session
		}
	}
`)(GraphqlView);
