import * as mimeTypes from 'mime-types';

export const getMimeType = (name: string): string => {
  const mimeType = mimeTypes.lookup(name);
  if (!mimeType) {
    throw new Error(`Failed to get mime type from ${name}.`);
  }
  return mimeType;
};
