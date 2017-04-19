import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

export class GraphqlView extends Component {

	render = () => (
		<div className="graphql-view">
			<h1>Graphql example</h1>
			{this.renderViewer()}
			<p>
				<button onClick={() => this.props.data.refetch()}>Refetch</button>
			</p>
			{/* <code>{JSON.stringify(data)}</code> */}
		</div>
	)

	renderViewer = () => {
		const {
			loading: isLoading,
			error,
			viewer,
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
			<div>
				<p>
					<strong>{viewer.login}</strong><br />
					{viewer.email}
				</p>
				<ul>
					{viewer.repositories.nodes.map(this.renderRepository)}
				</ul>
				{/* <code>{JSON.stringify(viewer)}</code> */}
			</div>
		);
	}

	renderRepository = repository => (
		<li>
			<p><strong>{repository.name}</strong></p>
			<p>{repository.description}</p>
		</li>
	)
}

GraphqlView.propTypes = {
	data: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		refetch: PropTypes.func.isRequired,
		error: PropTypes.object,
		viewer: PropTypes.shape({
			login: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			repositories: PropTypes.shape({
				nodes: PropTypes.arrayOf(PropTypes.shape({
					name: PropTypes.string.isRequired,
					description: PropTypes.string.isRequired,
				})),
			}),
		}),
	}),
};

export default graphql(gql`
	query GetMyInfo {
		viewer {
			login
			email
			repositories(first: 10) {
				nodes {
					name
					description
				}
			}
		}
	}
`)(GraphqlView);
