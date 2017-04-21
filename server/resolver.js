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
    asyncUser(id: 2) {
      id
      name
    }
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

		asyncUser: (({ id }) => {
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

			// fake delay and return promise
			return new Promise((resolve, _reject) => {
				setTimeout(() => {
					resolve(result);
				}, 1000);
			});
		}),

		errorMaybe: () => new Error('maybe test error message'),

		errorPromise: () => new Error('promise test error message'),
	},
};
