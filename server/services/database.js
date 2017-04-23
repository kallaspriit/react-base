// static mock data for testing
const data = {
	users: [{
		id: 1,
		login: 'jack',
		password: 'daniels',
		name: 'Jack Daniels',
		friendIds: [2],
	}, {
		id: 2,
		login: 'john',
		password: 'rambo',
		name: 'John Rambo',
		friendIds: [1],
	}, {
		id: 3,
		login: 'chuck',
		password: 'norris',
		name: 'Chuck Norris',
		friendIds: [],
	}],
};

// database returns just data objects, it does not know about models
export default class Database {

	getUserByLogin(login) {
		return new Promise((resolve, _reject) => {
			const info = data.users.find(user => user.login === login);

			if (!info) {
				resolve(null); // TODO or reject?
			}

			resolve(info);
		});
	}

	getUserByCredentials(login, password) {
		return new Promise((resolve, _reject) => {
			const info = data.users.find(user => user.login === login && user.password === password);

			if (!info) {
				resolve(null);
			}

			resolve(info);
		});
	}

}
