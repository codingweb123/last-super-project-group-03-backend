import { Feedback } from "../models/feedback.js"

export async function createFeedback(req, res) {
	res.status(201).json(await Feedback.create(req.body))
}

export async function getFeedbacks(req, res) {
	const { page = 1, perPage = 6, goodId } = req.query
	const skip = (page - 1) * perPage

	const feedbackQuery = Feedback.find()

	if (goodId) {
		feedbackQuery.where("goodId").equals(goodId)
	}

	feedbackQuery.populate("goodId", "name")

	const [totalFeedbacks, feedbacks] = await Promise.all([
		feedbackQuery.clone().countDocuments(),
		feedbackQuery.skip(skip).limit(perPage),
	])

	const totalPages = Math.ceil(totalFeedbacks / perPage)

	res.status(200).json({
		page,
		perPage,
		totalFeedbacks,
		totalPages,
		feedbacks,
	})
}
