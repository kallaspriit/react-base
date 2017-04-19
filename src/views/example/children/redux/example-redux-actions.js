import { createAction } from 'redux-actions';
import {
	INCREMENT,
} from './example-redux-constants';

export const incrementCounter = createAction(INCREMENT);
