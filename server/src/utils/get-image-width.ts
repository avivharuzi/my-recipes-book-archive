import * as sharp from 'sharp';

export const getImageWidth = async (
  input: string | Buffer
): Promise<number> => {
  const { width } = await sharp(input).metadata();
  if (!width) {
    throw new Error('Failed to get width of image.');
  }
  return width;
};
