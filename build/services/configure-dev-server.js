import createView from './create-view';
import { success } from './payload';

export default function configureDevServer(app) {
	// handle creating a new view
	app.post('/dev/create-view', (request, response) => {
		const name = request.body.name;

		if (typeof name !== 'string' || name.length === 0) {
			throw new Error('Please enter view name');
		}

		createView({
			name,
		});

		response.json(
			success({
				name,
			}),
		);
	});
}
