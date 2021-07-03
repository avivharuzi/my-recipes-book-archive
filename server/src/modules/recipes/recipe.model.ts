import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import {
  mongooseSimplePagination,
  PaginationModel,
} from 'mongoose-simple-pagination';

import { Image } from '../images/image.model';
import { User } from '../users/user.model';

export interface Recipe extends Document {
  user: PopulatedDoc<User & Document>;
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  directions: string[];
  coverImage: PopulatedDoc<Image & Document>;
  preparationTime: number;
  cookingTime: number;
  servingsAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<Recipe>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ingredients: [{ type: String, trim: true }],
    directions: [{ type: String, trim: true }],
    coverImage: { type: Schema.Types.ObjectId, required: true, ref: 'Image' },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servingsAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

recipeSchema.plugin(mongooseSimplePagination);

export const RecipeModel = model<Recipe, PaginationModel<Recipe>>(
  'Recipe',
  recipeSchema,
  'recipes'
);
