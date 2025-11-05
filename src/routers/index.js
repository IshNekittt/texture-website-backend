import express from 'express';

import texturesRouter from './textures.js';
import categoriesRouter from './categories.js';

const router = express.Router();

router.use('/textures', texturesRouter);
router.use('/categories', categoriesRouter);

export default router;
