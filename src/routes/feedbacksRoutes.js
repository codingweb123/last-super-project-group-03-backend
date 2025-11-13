import { Router } from "express"
import { celebrate } from "celebrate"

import {
	createFeedback,
	getFeedbacks,
} from "../controllers/feedbacksController.js"

import { createFeedbackSchema } from "../validations/feedbacksValidation.js"

const router = Router()

router.post("/feedbacks", celebrate(createFeedbackSchema), createFeedback)
router.get("/feedbacks", getFeedbacks)

export default router
