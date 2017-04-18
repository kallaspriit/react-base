import keyMirror from 'keymirror';

export function isJsonResponse(response) {
	const contentType = response.headers.get('content-type');

	return contentType && contentType.indexOf('application/json') !== -1;
}

// throws an error on failure, this will enable the client to catch it and not have to check for errors in response
export function checkStatus(response) {
	// expect 2xx status for normal response
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	// got an error, use statusText as default error message
	let message = response.statusText;

	// attempt to get a better error message from either json response "error" or text response
	if (isJsonResponse(response)) {
		return response.json().then((payload) => {
			if (typeof payload.error === 'string' && payload.error.length > 0) {
				message = payload.error;
			}

			throw new Error(message);
		});
	}

	const payload = response.text();

	if (typeof payload === 'string' && payload.length > 0) {
		message = payload;
	}

	throw new Error(message);
}

export function parseJson(response) {
	// check for json response
	if (isJsonResponse(response)) {
		return response.json();
	}

	// return just text if no json header was found
	return response.text();
}

export function encodeQueryString(data) {
	return Object.keys(data).map(key => [key, data[key]].map(encodeURIComponent).join('=')).join('&');
}

export const Method = keyMirror({
	GET: null,
	POST: null,
	HEAD: null,
	PUT: null,
	DELETE: null,
	OPTIONS: null,
});

// based on https://github.com/github/fetch
export default function request(method, url, options = {}) {
	// make sure a valid method is provided
	if (Object.keys(Method).indexOf(method) === -1) {
		throw new Error(`Invalid method "${method}" provided, expected one of ${Object.keys(Method).join(', ')}`);
	}

	const usedOptions = {
		method,
		...options,
	};

	// expect json payloads by default but allow it to be overridden
	usedOptions.headers = {
		'Content-Type': 'application/json',
		...usedOptions.headers,
	};

	return fetch(url, usedOptions)
		.then(checkStatus)
		.then(parseJson);
}

export function get(url, parameters) {
	const requestUrl = parameters ? `${url}?${encodeQueryString(parameters)}` : url;

	return request(Method.GET, requestUrl);
}

export function post(url, data) {
	return request(Method.POST, url, {
		body: JSON.stringify(data),
	});
}
