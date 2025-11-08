import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;
  const updateData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    city: req.body.city,
    postalOffice: req.body.postalOffice,
  };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);
    updateData.avatar = result.secure_url;
  }

  const user = await User.findOneAndUpdate({ _id: userId }, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
