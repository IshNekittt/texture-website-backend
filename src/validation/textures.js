import Joi from 'joi';

export const createTextureSchema = Joi.object({
  categoryId: Joi.string().hex().length(24).required().messages({
    'string.base': 'ID категорії має бути рядком',
    'string.hex': 'ID категорії має бути валідним ObjectId',
    'string.length': 'ID категорії повинен містити 24 символи',
    'any.required': "ID категорії є обов'язковим полем",
  }),

  imagesUrls: Joi.array().items(Joi.string().uri()).required().messages({
    'array.base': 'Поле imagesUrls повинно бути масивом',
    'any.required': "Поле imagesUrls є обов'язковим",
    'string.uri': 'Кожен елемент у imagesUrls повинен бути валідним URL',
  }),

  fileUrl: Joi.string().uri().required().messages({
    'string.base': 'Поле fileUrl повинно бути рядком',
    'string.uri': 'Поле fileUrl повинно бути валідним URL',
    'any.required': "Поле fileUrl є обов'язковим",
  }),

  description: Joi.string().allow('').messages({
    'string.base': 'Опис повинен бути рядком',
  }),

  textureName: Joi.string().min(3).max(100).required().messages({
    'string.base': "Ім'я текстури повинно бути рядком",
    'string.min': "Ім'я текстури повинно містити щонайменше 3 символи",
    'string.max': "Ім'я текстури не повинно перевищувати 100 символів",
    'any.required': "Ім'я текстури є обов'язковим полем",
  }),
});

export const updateTextureSchema = Joi.object({
  categoryId: Joi.string().hex().length(24).messages({
    'string.base': 'ID категорії має бути рядком',
    'string.hex': 'ID категорії має бути валідним ObjectId',
    'string.length': 'ID категорії повинен містити 24 символи',
  }),

  imagesUrls: Joi.array().items(Joi.string().uri()).messages({
    'array.base': 'Поле imagesUrls повинно бути масивом',
    'string.uri': 'Кожен елемент у imagesUrls повинен бути валідним URL',
  }),

  fileUrl: Joi.string().uri().messages({
    'string.base': 'Поле fileUrl повинно бути рядком',
    'string.uri': 'Поле fileUrl повинно бути валідним URL',
  }),

  description: Joi.string().allow('').messages({
    'string.base': 'Опис повинен бути рядком',
  }),

  textureName: Joi.string().min(3).max(100).messages({
    'string.base': "Ім'я текстури повинно бути рядком",
    'string.min': "Ім'я текстури повинно містити щонайменше 3 символи",
    'string.max': "Ім'я текстури не повинно перевищувати 100 символів",
  }),
})
  .min(1)
  .messages({
    'object.min': 'Тіло запиту повинно містити хоча б одне поле для оновлення',
  });
