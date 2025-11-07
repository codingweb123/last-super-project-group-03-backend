import { Feedback } from '../models/feedback.js';

export async function createFeedback(req, res) {
  res.status(201).json(await Feedback.create(req.body));
}

export async function getFeedbacks(req, res) {
  res.status(200).json(await Feedback.find());
}
