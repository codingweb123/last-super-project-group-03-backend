import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getAllCategories } from '../controllers/categoriesController.js';

import { getAllCategoriesSchema } from '../validations/categoriesValidation.js';

const router = Router();

router.get('/categories', celebrate(getAllCategoriesSchema), getAllCategories);

export default router;
