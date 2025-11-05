import express from 'express';

import texturesRouter from './textures.js';

const router = express.Router();

router.use('/textures', texturesRouter);

export default router;
