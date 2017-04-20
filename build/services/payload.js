export function success(payload) {
	return {
		success: true,
		error: null,
		payload,
	};
}

export function error(message) {
	return {
		success: false,
		error: message,
		payload: null,
	};
}
