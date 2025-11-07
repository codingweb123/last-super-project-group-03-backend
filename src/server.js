import express from "express"
import cors from "cors"
import helmet from "helmet"
import { connectMongoDB } from "./db/connectMongoDB.js"
import { logger } from "./middleware/logger.js"
import cookieParser from "cookie-parser"
import { myCookieParser } from "./middleware/myCookieParser.js"
import { notFoundHandler } from "./middleware/notFoundHandler.js"
import { errors } from "celebrate"
import { errorHandler } from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import categoriesRoutes from "./routes/categoriesRoutes.js"
import feedbacksRoutes from "./routes/feedbacksRoutes.js"
import goodsRoutes from "./routes/goodsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT ?? 3030

app.use(
	express.json({
		type: ["application/json", "application/vnd.api+json"],
		limit: "100kb",
	})
)
app.use(cors())
app.use(helmet())
app.use(logger)
app.use(cookieParser())
app.use(myCookieParser)

app.use(authRoutes)
app.use(categoriesRoutes)
app.use(feedbacksRoutes)
app.use(goodsRoutes)
app.use(userRoutes)

app.use(notFoundHandler)
app.use(errors())
app.use(errorHandler)

await connectMongoDB()

app.listen(PORT, () => {
	console.log(`✅ Server ran successfully on port ${PORT}`)
})
