import createHttpError from 'http-errors';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  const categories = await getAllCategories();
  res.status(200).json({
    status: 200,
    message: 'Successfully found categories!',
    data: categories,
  });
};

export const getCategoryByIdController = async (req, res) => {
  const { categoryId } = req.params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    throw createHttpError(404, `Category with id ${categoryId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found category with id ${categoryId}!`,
    data: category,
  });
};

export const createCategoryController = async (req, res) => {
  const category = await createCategory(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a category!',
    data: category,
  });
};

export const updateCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const updatedCategory = await updateCategory(categoryId, req.body);

  if (!updatedCategory) {
    throw createHttpError(404, `Category with id ${categoryId} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated a category!',
    data: updatedCategory,
  });
};

export const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const result = await deleteCategory(categoryId);

  if (!result) {
    throw createHttpError(404, `Category with id ${categoryId} not found`);
  }

  res.status(204).send();
};
