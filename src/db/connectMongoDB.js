import mongoose from "mongoose"

export async function connectMongoDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		console.log("✅ MongoDB connection established successfully")
	} catch (error) {
		console.log("❌ Failed to connect to MongoDB: ", error.message)
		process.exit(1)
	}
}
