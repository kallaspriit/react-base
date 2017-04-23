export default function formatGraphqlError(error) {
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
