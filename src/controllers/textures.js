import createHttpError from 'http-errors';

import {
  getAllTextures,
  getTextureById,
  createTexture,
  updateTexture,
  deleteTexture,
} from '../services/textures.js';

export const getTexturesController = async (req, res) => {
  const result = await getAllTextures(req.query);

  res.status(200).json({
    status: 200,
    message: 'Successfully found textures!',
    data: result,
  });
};

export const getTextureByIdController = async (req, res) => {
  const { textureId } = req.params;
  const texture = await getTextureById(textureId);

  if (!texture) {
    throw createHttpError(404, `Texture with id ${textureId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found texture with id ${textureId}!`,
    data: texture,
  });
};

export const createTexturesController = async (req, res) => {
  const texture = await createTexture(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a texture!',
    data: texture,
  });
};

export const updateTextureController = async (req, res) => {
  const { textureId } = req.params;
  const updatedTexture = await updateTexture(textureId, req.body);

  if (!updatedTexture) {
    throw createHttpError(404, `Texture with id ${textureId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a texture!',
    data: updatedTexture,
  });
};

export const deleteTextureController = async (req, res) => {
  const { textureId } = req.params;
  const result = await deleteTexture(textureId);

  if (!result) {
    throw createHttpError(404, `Texture with id ${textureId} not found`);
  }

  res.status(204).send();
};
