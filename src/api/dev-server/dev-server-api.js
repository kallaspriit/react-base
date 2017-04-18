import { post } from '../../services/fetch';

const baseUrl = 'http://localhost:9991';

export const createView = ({
	name,
}) => post(`${baseUrl}/create-view`, {
	name,
});
