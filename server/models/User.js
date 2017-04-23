// facebook dataloader
// const userDataLoader = new DataLoader(ids => db.getMultiple('user', ids));

// fake async data loader
// const userDataLoader = {
// 	load: id => new Promise((resolve, _reject) => {
// 		resolve({
// 			id,
// 			name: 'Jack Daniels',
// 		});
// 	}),
// };

/*
query GetViewerInfo {
  viewer {
    id
    login
    name
  }
}

query GetExistingAllowedUserInfo {
  user(login: "jack") {
    id
    login
    name
  }
}

query GetOwnInfo {
  user(login: "jack") {
    id
    login
    name
  }
}

query GetFriendInfo {
  user(login: "john") {
    id
    login
    name
  }
}

query GetStrangerInfo {
  user(login: "chuck") {
    id
    login
    name
  }
}

query GetInvalidInfo {
  user(login: "xxx") {
    id
    login
    name
  }
}

mutation LoginValid($validCredentials: CredentialsInput) {
  login(credentials: $validCredentials) {
    id
    login
    name
  }
}

mutation LoginInvalid($invalidCredentials: CredentialsInput) {
  login(credentials: $invalidCredentials) {
    id
    login
    name
  }
}

mutation Logout {
  logout
}
*/

export default class User {

	// requirements (https://youtu.be/etax3aEe2dA?t=24m38s)
	// - globally unique
	// - usable as a refetch identifier
	// - opaque to clients
	id;
	login;
	name;

	constructor({
		id,
		login,
		name,
	}) {
		this.id = id;
		this.login = login;
		this.name = name;
	}

	static async gen({ viewer, database }, login) {
		// TODO implement batching data loader
		const user = await database.getUserByLogin(login);

		// authorize viewing this data based on viewer (has to be logged in and have the same id)
		const isAuthorized =
			user !== null
			&& viewer !== null
			&& (user.id === viewer.id || user.friendIds.indexOf(viewer.id) !== -1); // allow self and friends

		// return error if not authorized to view this resource
		if (!isAuthorized) {
			// TODO consider custom errors? return new AuthorizationError(); ?
			return new Error('Not authorized to view this resource or the resource does not exist');
		}

		return new User(user);
	}

	static async login({ database }, login, password) {
		const user = await database.getUserByCredentials(login, password);

		// return null if the user was not found
		if (!user) {
			return null;
		}

		return new User(user);
	}
}
