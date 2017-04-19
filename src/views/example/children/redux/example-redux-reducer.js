import { handleActions } from 'redux-actions';
import {
	INCREMENT,
} from './example-redux-constants';

const initialState = {
	counter: 0,
};

export default handleActions({
	[INCREMENT]: (state, _action) => ({
		counter: state.counter + 1,
	}),
}, initialState);
