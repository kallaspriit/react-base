import User from '../models/User';

export default function resolveViewer(request) {
	const viewerInfo = request.session.viewer;

	if (!viewerInfo) {
		return null;
	}

	return new User(viewerInfo);
}
