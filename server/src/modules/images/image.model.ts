import { Document, model, Schema } from 'mongoose';

import { ImageSizes } from '../../utils/create-image-sizes';

export interface Image extends Document {
  sizes: ImageSizes;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const imageSizeSchemaPart = {
  path: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
  },
};

const imageSchema = new Schema<Image>(
  {
    sizes: {
      thumbnail: { ...imageSizeSchemaPart },
      small: { ...imageSizeSchemaPart },
      medium: { ...imageSizeSchemaPart },
      large: { ...imageSizeSchemaPart },
      original: { ...imageSizeSchemaPart },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ImageModel = model<Image>('Image', imageSchema, 'images');
