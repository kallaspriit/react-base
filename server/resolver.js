// something to change..
let counter = 1;

/*
{
	sandbox {
		message
		sum(a: 3, b: 5)
	}
}
*/

export default {
	sandbox: {
		message: () => `Hello GraphQL #${counter++}`,
		sum: ({ a, b }) => a + b,
		list: () => [1, 2, 3, 4],
	},
};
