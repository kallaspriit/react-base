import PropTypes from 'prop-types';

// place any reusable PropTypes validation shapes here.

export const RouterMatchShape = PropTypes.shape({
	params: PropTypes.object.isRequired,
	isExact: PropTypes.bool.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
}).isRequired;

export const ChildrenShape = PropTypes.oneOfType([
	PropTypes.arrayOf(PropTypes.node),
	PropTypes.node,
]);
