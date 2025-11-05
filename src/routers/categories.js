import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkApiKey } from '../middlewares/checkApiKey.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  getCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/categories.js';

import {
  createCategorySchema,
  updateCategorySchema,
} from '../validation/categories.js';

const router = Router();
router.get('/', ctrlWrapper(getCategoriesController));
router.get(
  '/:categoryId',
  isValidId('categoryId'),
  ctrlWrapper(getCategoryByIdController),
);

router.use(checkApiKey);

router.post(
  '/',
  validateBody(createCategorySchema),
  ctrlWrapper(createCategoryController),
);

router.patch(
  '/:categoryId',
  isValidId('categoryId'),
  validateBody(updateCategorySchema),
  ctrlWrapper(updateCategoryController),
);

router.delete(
  '/:categoryId',
  isValidId('categoryId'),
  ctrlWrapper(deleteCategoryController),
);

export default router;
