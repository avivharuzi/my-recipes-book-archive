import * as sharp from 'sharp';

export const resizeImage = async (
  input: string | Buffer,
  width: number
): Promise<ResizedImage> => {
  const { data, info } = await sharp(input)
    .resize(width)
    .jpeg()
    .toBuffer({ resolveWithObject: true });

  return {
    data,
    width: info.width,
    height: info.height,
    size: info.size,
    extension: 'jpg',
  };
};

export interface ResizedImage {
  data: Buffer;
  width: number;
  height: number;
  size: number;
  extension: string;
}
