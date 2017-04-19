import PropTypes from 'prop-types';

export const RouterMatchShape = PropTypes.shape({
	params: PropTypes.object.isRequired,
	isExact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
}).isRequired;
