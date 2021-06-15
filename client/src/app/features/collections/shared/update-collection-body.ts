import { CreateCollectionBody } from './create-collection-body';

export interface UpdateCollectionBody extends CreateCollectionBody {
  recipes: string[];
}
