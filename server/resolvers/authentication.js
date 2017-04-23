import User from '../models/User';

export default {
	login: async (args, context) => {
		const session = context.session;
		const {
			login,
			password,
		} = args.credentials;

		// logout existing user
		session.viewer = null;

		// try to find user by credentials
		const user = await User.login(context, login, password);

		// return error if user was not found
		if (!user) {
			return new Error('Invalid username or password');
		}

		// return the error if provided by the login method
		if (user instanceof Error) {
			return user;
		}

		// store serialized viewer info in the session
		session.viewer = {
			...user,
		};

		console.log('added user to session', user, session.viewer);

		// return logged in user info
		return user;
	},

	logout: (args, context) => {
		const session = context.session;

		// logout existing user
		session.viewer = null;

		return true;
	},
};
