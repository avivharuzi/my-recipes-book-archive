import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import {
  mongooseSimplePagination,
  PaginationModel,
} from 'mongoose-simple-pagination';

import { Recipe } from '../recipes/recipe.model';
import { User } from '../users/user.model';

export interface Collection extends Document {
  user: PopulatedDoc<User & Document>;
  name: string;
  description?: string;
  recipes: PopulatedDoc<Recipe & Document>[];
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<Collection>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  { timestamps: true }
);

collectionSchema.plugin(mongooseSimplePagination);

export const CollectionModel = model<Collection, PaginationModel<Collection>>(
  'Collection',
  collectionSchema,
  'collections'
);
