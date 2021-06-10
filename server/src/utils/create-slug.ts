import slugify from 'slugify';

export const createSlug = (value: string): string => {
  return slugify(value, {
    lower: true,
    strict: true,
  });
};
