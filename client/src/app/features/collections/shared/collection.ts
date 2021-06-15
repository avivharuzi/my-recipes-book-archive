import { Recipe } from '../../recipes/shared/recipe';
import { User } from '../../auth/shared/user';

export interface Collection {
  user: User;
  name: string;
  description?: string;
  recipes: Recipe[];
  createdAt: Date;
  updatedAt: Date;
}
