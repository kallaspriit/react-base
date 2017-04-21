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
	},
};
