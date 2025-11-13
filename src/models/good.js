import { Schema, model } from "mongoose"
import { Feedback } from "./feedback.js" // eslint-disable-line

const goodSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			value: {
				type: Number,
				min: 1,
				required: true,
			},
			currency: {
				type: String,
				enum: ["грн"],
				required: true,
			},
		},
		sizes: {
			type: [String],
			enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
			required: true,
		},
		colors: {
			type: [String],
			enum: ["white", "black", "grey", "blue", "green", "red", "pastel"],
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		feedbacks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Feedback",
			},
		],
		prevDescription: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["women", "men", "unisex"],
			required: true,
		},
		characteristics: {
			type: [String],
			required: true,
		},
	},
	{
		versionKey: false,
	}
)

goodSchema.virtual("stars").get(function () {
	if (!this.feedbacks.length) return 0

	if (typeof this.feedbacks[0] === "object" && this.feedbacks[0].rate) {
		const sum = this.feedbacks.reduce((acc, feedback) => acc + feedback.rate, 0)
		return Math.round((sum / this.feedbacks.length) * 2) / 2
	}

	return 0
})

goodSchema.options.id = false

goodSchema.set("toJSON", { virtuals: true })
goodSchema.set("toObject", { virtuals: true })

goodSchema.pre(["find", "findOne"], function (next) {
	this.populate("category", "name")
	this.populate("feedbacks", "rate author description date")
	next()
})

goodSchema.index(
	{ name: "text", prevDescription: "text", description: "text" },
	{
		name: "GoodTextIndex",
		weights: { name: 10, prevDescription: 8, description: 6 },
		default_language: "english",
	}
)

export const Good = model("Good", goodSchema)
