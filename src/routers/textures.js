import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { checkApiKey } from '../middlewares/checkApiKey.js';

import {
  createTexturesController,
  deleteTextureController,
  getTexturesController,
  updateTextureController,
  getTextureByIdController,
} from '../controllers/textures.js';

import {
  createTextureSchema,
  updateTextureSchema,
} from '../validation/textures.js';

const router = Router();

router.get('/', ctrlWrapper(getTexturesController));

router.get(
  '/:textureId',
  isValidId('textureId'),
  ctrlWrapper(getTextureByIdController),
);

router.use(checkApiKey);

router.post(
  '/',
  validateBody(createTextureSchema),
  ctrlWrapper(createTexturesController),
);

router.patch(
  '/:textureId',
  isValidId('textureId'),
  validateBody(updateTextureSchema),
  ctrlWrapper(updateTextureController),
);

router.delete(
  '/:textureId',
  isValidId('textureId'),
  ctrlWrapper(deleteTextureController),
);

export default router;
