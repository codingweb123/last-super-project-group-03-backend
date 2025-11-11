import { celebrate } from "celebrate";
import { Router } from "express"
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { getCurrentUser, loginUser, logoutUser, refreshUserSession, registerUser, requestResetEmail, resetPassword } from "../controllers/authController.js";
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail);
router.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);
router.post('/auth/me', authenticate, getCurrentUser);

export default router
