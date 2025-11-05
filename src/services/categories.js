import { CategoryCollection } from '../db/models/categories.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllCategories = async () => {
  const categories = await CategoryCollection.find()
    .sort({ categoryName: SORT_ORDER.ASC })
    .lean();
  return categories;
};

export const getCategoryById = async (categoryId) => {
  const category = await CategoryCollection.findById(categoryId).lean();
  return category;
};

export const createCategory = async (payload) => {
  const newCategory = await CategoryCollection.create(payload);
  return newCategory;
};

export const updateCategory = async (categoryId, payload) => {
  const updatedCategory = await CategoryCollection.findByIdAndUpdate(
    categoryId,
    payload,
    { new: true },
  ).lean();
  return updatedCategory;
};

export const deleteCategory = async (categoryId) => {
  const deletedCategory = await CategoryCollection.findByIdAndDelete(
    categoryId,
  );
  return deletedCategory;
};
