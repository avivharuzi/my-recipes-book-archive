import { Image } from './image';

export interface ComboboxItem {
  title: string;
  subtitle?: string;
  value: string;
  image?: Image;
}
