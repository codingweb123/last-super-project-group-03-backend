import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserProfile } from '../controllers/userController.js';
import { updateUserSchema } from '../validations/userValidation.js';

const router = Router();

router.use('/users', authenticate);
router.patch(
  '/users/me/',
  upload.single('avatar'),
  celebrate(updateUserSchema),
  updateUserProfile,
);

export default router;
