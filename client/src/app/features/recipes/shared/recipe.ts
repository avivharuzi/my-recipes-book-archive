import { Image } from '../../../shared/shared/image';
import { User } from '../../auth/shared/user';

export interface Recipe {
  user: User;
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  directions: string[];
  coverImage: Image;
  preparationTime: number;
  cookingTime: number;
  servingsAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
