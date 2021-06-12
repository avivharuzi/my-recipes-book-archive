export interface Image {
  sizes: ImageSizes;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageSizes {
  thumbnail: ImageSize;
  small: ImageSize;
  medium: ImageSize;
  large: ImageSize;
  original: ImageSize;
}

export interface ImageSize {
  path: string;
  width: number;
  height: number;
  mimeType: string;
  size: number;
}

export type ImageSizesType =
  | 'thumbnail'
  | 'small'
  | 'medium'
  | 'large'
  | 'original';
