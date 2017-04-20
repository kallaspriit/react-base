export default function enableDestroy(server) {
	const connections = {};

	server.on('connection', (conn) => {
		const key = `${conn.remoteAddress}:${conn.remotePort}`;

		connections[key] = conn;

		conn.on('close', () => {
			delete connections[key];
		});
	});

	server.destroy = (cb) => { // eslint-disable-line no-param-reassign
		server.close(cb);

		Object.keys(connections).forEach((key) => {
			connections[key].destroy();

			delete connections[key];
		});
	};
}
