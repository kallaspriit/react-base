import User from '../models/User';

export default {

	user: ({ login }, context) => User.gen(context, login),

};
