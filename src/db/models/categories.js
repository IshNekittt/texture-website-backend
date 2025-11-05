import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Ім'я категорії є обов'язковим полем."],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'texture-categories',
  },
);

export const CategoryCollection = model('Category', categorySchema);
