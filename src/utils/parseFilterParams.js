import { isValidObjectId } from 'mongoose';

export const parseFilterParams = (query) => {
  const { categoryId, searchQuery } = query;
  const filter = {};

  if (categoryId && isValidObjectId(categoryId)) {
    filter.categoryId = categoryId;
  }

  if (searchQuery) {
    filter.textureName = { $regex: searchQuery, $options: 'i' };
  }

  return filter;
};
