export default function formatGraphqlError(error) {
	// TODO log the errors

	// only send detailed error information in development mode
	if (process.env.NODE_ENV === 'development') {
		return {
			message: error.message,
			locations: error.locations,
			stack: error.stack,
			path: error.path,
		};
	}

	return {
		message: error.message,
	};
}
