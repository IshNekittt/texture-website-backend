import { model, Schema } from 'mongoose';

const textureSchema = new Schema(
  {
    textureName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: '',
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    imagesUrls: {
      type: [String],
      default: [],
    },

    fileUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'textures-info',
  },
);

export const TextureCollection = model('Texture', textureSchema);
