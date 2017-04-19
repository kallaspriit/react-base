// don't put anything private here, included in source!
const config = {
	host: 'localhost',
	port: 4000,
	endpoint: '/graphql',
};

// build the url
config.url = `${config.port === 443 ? 'https' : 'http'}://${config.host}:${config.port}${config.endpoint}`;

export default config;
