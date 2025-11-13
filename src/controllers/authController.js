import createHttpError from "http-errors"
import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { createSession, setSessionCookies } from "../services/auth.js"
import { Session } from "../models/session.js"

export const registerUser = async (req, res) => {
	const { firstName, phone, password } = req.body

	const existingUser = await User.findOne({ phone })
	if (existingUser) {
		throw createHttpError(400, "Phone in use")
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const newUser = await User.create({
		firstName,
		phone,
		password: hashedPassword,
	})

	const newSession = await createSession(newUser._id)
	setSessionCookies(res, newSession)

	res.status(201).json(newUser)
}

export const loginUser = async (req, res) => {
	const { phone, password } = req.body

	const user = await User.findOne({ phone })
	if (!user) {
		throw createHttpError(401, "Invalid credentials")
	}

	const isValidPassword = await bcrypt.compare(password, user.password)
	if (!isValidPassword) {
		throw createHttpError(401, "Invalid credentials")
	}

	await Session.deleteOne({ userId: user._id })

	const newSession = await createSession(user._id)
	setSessionCookies(res, newSession)

	res.status(200).json(user)
}

export const logoutUser = async (req, res) => {
	const refreshToken = req.cookies.refreshToken
		? req.cookies.refreshToken
		: req.myCookies.refreshToken

	if (refreshToken) {
		await Session.deleteOne({ refreshToken })
	}

	res.clearCookie("sessionId")
	res.clearCookie("accessToken")
	res.clearCookie("refreshToken")

	res.status(204).send()
}

export const refreshUserSession = async (req, res) => {
	const refreshToken = req.cookies.refreshToken
		? req.cookies.refreshToken
		: req.myCookies.refreshToken

	const session = await Session.findOne({ refreshToken })

	if (!session) {
		throw createHttpError(401, "Session not found")
	}

	const isSessionTokenExpired =
		new Date() > new Date(session.refreshTokenValidUntil)

	if (isSessionTokenExpired) {
		throw createHttpError(401, "Session token expired")
	}

	await Session.deleteOne({ refreshToken })

	const newSession = await createSession(session.userId)
	setSessionCookies(res, newSession)

	res.status(200).json({
		message: "Session refreshed",
	})
}

export const getCurrentUser = async (req, res) => {
	const user = req.user
	res.status(200).json(user)
}
