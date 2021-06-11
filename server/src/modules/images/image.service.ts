import { BadRequest } from '../../errors/bad-request';
import { createImageSizes, ImageSizes } from '../../utils/create-image-sizes';
import { deleteImageSizes } from '../../utils/delete-image-sizes';
import { Image, ImageModel } from './image.model';
import { NotFound } from '../../errors/not-found';

export class ImageService {
  static async saveAndCreateMany(filesData: Buffer[]): Promise<Image[]> {
    const saveAndCreatePromises = filesData.map(fileData =>
      ImageService.saveAndCreate(fileData)
    );
    return Promise.all(saveAndCreatePromises);
  }

  static async saveAndCreate(fileData: Buffer): Promise<Image> {
    const imageSizes = await createImageSizes(fileData);
    return ImageService.create(imageSizes);
  }

  static async create(imageSizes: ImageSizes): Promise<Image> {
    return await ImageModel.create({
      sizes: imageSizes,
    });
  }

  static async delete(id: string): Promise<Image> {
    const image = await ImageModel.findByIdAndDelete(id);
    if (!image) {
      throw new NotFound();
    }
    await deleteImageSizes(image.sizes);
    return image;
  }

  static async deleteMany(ids: string[]): Promise<Image[]> {
    const query = { id: { $in: ids } };
    const images: Image[] = await ImageModel.find(query);
    if (images.length !== ids.length) {
      throw new BadRequest('One of the images is not exist.');
    }
    await ImageModel.deleteMany(query);
    const deleteImageSizesPromises = images.map(image =>
      deleteImageSizes(image.sizes)
    );
    await Promise.all(deleteImageSizesPromises);
    return images;
  }
}
