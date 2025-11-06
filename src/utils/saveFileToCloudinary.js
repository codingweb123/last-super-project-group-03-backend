import { v2 as cloudinary } from "cloudinary"

export async function saveFileToCloudinary(buffer) {}

export async function deleteFileFromCloudinary(public_id) {
	return new Promise((res, rej) =>
		cloudinary.uploader.destroy(
			public_id,
			{
				resource_type: "image",
				invalidate: true,
			},
			(err, result) => (err ? rej(err) : res(result))
		)
	)
}
