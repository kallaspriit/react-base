import { post } from '../../services/fetch';

const baseUrl = '/dev';

export const createView = ({
	name,
}) => post(`${baseUrl}/create-view`, {
	name,
});
