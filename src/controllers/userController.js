import { User } from "../models/user.js"

export const updateUserProfile = async (req, res) => {
	res.status(200).json(
		await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
		})
	)
}
