import { model, Schema } from "mongoose"

const orderSchema = new Schema(
	{
		products: [
			{
				id: { type: Schema.Types.ObjectId, ref: "Good", required: true },
				amount: { type: Number, required: true, min: 1 },
				size: {
					type: String,
					required: true,
					enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
				},
				color: {
					type: String,
					required: true,
					enum: ["white", "black", "grey", "blue", "green", "red", "pastel"],
				},
			},
		],
		sum: { type: Number, required: true, min: 1 },
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		date: { type: String, required: true },
		orderNum: {
			type: String,
			unique: true,
		},
		comment: { type: String, default: "" },
		status: {
			type: String,
			enum: ["processing", "packing", "success", "declined"],
			default: "processing",
		},
		userData: {
			firstName: {
				type: String,
				trim: true,
				required: true,
			},
			lastName: {
				type: String,
				trim: true,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
			city: { type: String, required: true },
			postalOffice: { type: Number, required: true, min: 1 },
		},
	},
	{ versionKey: false }
)

export const Order = model("Order", orderSchema)
