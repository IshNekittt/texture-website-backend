import Joi from 'joi';

export const createCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).required().messages({
    'string.base': "Ім'я категорії повинно бути рядком",
    'string.min': "Ім'я категорії повинно містити щонайменше 2 символи",
    'string.max': "Ім'я категорії не повинно перевищувати 50 символів",
    'any.required': "Ім'я категорії є обов'язковим полем",
  }),
});

export const updateCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).messages({
    'string.base': "Ім'я категорії повинно бути рядком",
    'string.min': "Ім'я категорії повинно містити щонайменше 2 символи",
    'string.max': "Ім'я категорії не повинно перевищувати 50 символів",
  }),
})
  .min(1)
  .messages({
    'object.min': 'Тіло запиту повинно містити хоча б одне поле для оновлення',
  });
