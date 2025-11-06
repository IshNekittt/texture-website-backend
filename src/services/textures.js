import createHttpError from 'http-errors';
import { TextureCollection } from '../db/models/texture.js';
import { CategoryCollection } from '../db/models/categories.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllTextures = async (query) => {
  const { page, perPage } = parsePaginationParams(query);
  const { sortBy, sortOrder } = parseSortParams(query);
  const filter = parseFilterParams(query);

  const totalItems = await TextureCollection.countDocuments(filter);
  const paginationData = calculatePaginationData(totalItems, page, perPage);

  if (page > paginationData.totalPages && paginationData.totalPages > 0) {
    return {
      data: [],
      ...paginationData,
      page: paginationData.totalPages,
    };
  }

  const data = await TextureCollection.find(filter)
    .populate('categoryId')
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  return {
    data,
    ...paginationData,
  };
};

export const getTextureById = async (textureId) => {
  const texture = await TextureCollection.findById(textureId)
    .populate('categoryId')
    .lean();
  return texture;
};

export const createTexture = async (payload) => {
  const categoryExists = await CategoryCollection.findById(payload.categoryId);
  if (!categoryExists) {
    throw createHttpError(
      404,
      `Category with id ${payload.categoryId} not found`,
    );
  }

  const newTexture = await TextureCollection.create(payload);
  return newTexture;
};

export const updateTexture = async (textureId, payload) => {
  if (payload.categoryId) {
    const categoryExists = await CategoryCollection.findById(
      payload.categoryId,
    );
    if (!categoryExists) {
      throw createHttpError(
        404,
        `Category with id ${payload.categoryId} not found`,
      );
    }
  }

  const updatedTexture = await TextureCollection.findByIdAndUpdate(
    textureId,
    payload,
    { new: true },
  ).lean();

  return updatedTexture;
};

export const deleteTexture = async (textureId) => {
  const deletedTexture = await TextureCollection.findByIdAndDelete(textureId);
  return deletedTexture;
};
