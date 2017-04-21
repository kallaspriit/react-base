// something to change..
let counter = 1;

export default {
	sandbox: {
		message: () => `Hello GraphQL #${counter++}`,
	},
};
