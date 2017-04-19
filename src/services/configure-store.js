import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promise-middleware';
import reducer from '../reducer';

export default function configureStore(initialState) {
	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(thunkMiddleware),
			applyMiddleware(promiseMiddleware),
			process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f,
		),
	);

	// hot-reload reducers
	if (module.hot) {
		module.hot.accept('../reducer', () => {
			const updatedReducer = require('../reducer').default;  // eslint-disable-line global-require

			store.replaceReducer(updatedReducer);
		});
	}

	return store;
}
