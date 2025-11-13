import { User } from '../models/user.js';

export const updateUserProfile = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
    new: true,
  });
  res.status(200).json(user);
};
