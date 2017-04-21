// something to change..
let counter = 1;

/*
{
  sandbox {
    message
    sum(a: 3, b: 7)
    list
    user(id: 1) {
      id
      name
    }
    #asyncUser(id: 2) {
    #  id
    #  name
    #}
    #errorMaybe
    #errorPromise
  }
}

*/

export default {
	sandbox: {
		message: () => `Hello GraphQL #${counter++}`,

		sum: ({ a, b }) => a + b,

		list: () => [1, 2, 3, 4],

		user: (({ id }) => {
			const users = [{
				id: 1,
				name: 'Hugh Jass',
			}, {
				id: 2,
				name: 'Jack Mehoff',
			}, {
				id: 3,
				name: 'Al Coholic',
			}];

			return users.find(user => user.id === id);
		}),

		asyncUser: ({ id }) => new Promise((resolve, _reject) => {
			setTimeout(() => {
				const users = [{
					id: 1,
					name: 'Hugh Jass',
				}, {
					id: 2,
					name: 'Jack Mehoff',
				}, {
					id: 3,
					name: 'Al Coholic',
				}];

				const result = users.find(user => user.id === id);

				resolve(result);
			}, 1000);
		}),

		errorMaybe: () => new Error('maybe test error message'),

		errorDefinitely: () => new Error('definitely test error message'),

		exceptionMaybe: () => {
			throw new Error('maybe exception message');
		},

		exceptionDefinitely: () => {
			throw new Error('definitely exception message');
		},

		// TODO this crashes the server, any good way to handle?
		exceptionPromise: () => new Promise((_resolve, _reject) => {
			setTimeout(() => {
				throw new Error('promise exception message');
			}, 1000);
		}),
	},
};
