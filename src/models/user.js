import { model, Schema } from "mongoose"

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			default: "",
		},
		phone: {
			type: String,
			unique: true,
			trim: true,
			required: true,
		},
		city: {
			type: String,
			trim: true,
			default: "",
		},
		postalOffice: {
			type: Number,
			default: 1,
		},
		avatar: {
			type: String,
			default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
		},
		avatar_id: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
	}
)

userSchema.methods.toJSON = function () {
	const obj = this.toObject()
	delete obj.password
	return obj
}

export const User = model("User", userSchema)
