export default function buildUrl({ host, port, endpoint }) {
	return `${port === 443 ? 'https' : 'http'}://${host || 'localhost'}` +
		`${port !== 80 ? `:${port}` : ''}${endpoint || '/graphql'}`;
}
