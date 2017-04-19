import { createAction } from 'redux-actions';
import {
	INCREMENT,
} from './reduxConstants';

export const incrementCounter = createAction(INCREMENT);
