export default {
	// login: (args, context) => {
	// 	console.log('args', args);
	// 	console.log('context', context.session);
	//
	// 	const {
	// 		username,
	// 	} = args.credentials;
	//
	// 	console.log('username', username);
	//
	// 	return {
	// 		id: 1,
	// 		login: username,
	// 		name: 'Ivana Humpalot',
	// 	};
	// },
	authentication: {
		login: (args, request) => {
			console.log('login args', args);

			const {
				username,
			} = args.credentials;

			console.log('username', username);
			console.log('request.session.counter', request.session.counter);

			return {
				id: 2,
				login: username,
				name: 'Jack Daniels',
			};
		},
	},
};
