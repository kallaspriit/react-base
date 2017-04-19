import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from './promise-middleware';

// TODO take from auto-generated index
import exampleReduxReducer from '../views/example/children/redux/example-redux-reducer';

export default function configureStore(initialState) {
	return createStore(
		combineReducers({
			exampleReduxReducer,
		}),
		initialState,
		compose(
			applyMiddleware(thunkMiddleware),
			applyMiddleware(promiseMiddleware),
			process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f,
		),
	);
}
