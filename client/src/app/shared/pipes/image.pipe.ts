import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Image, ImageSizesType } from '../shared/image';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: Image, size: ImageSizesType = 'medium'): string {
    return `${environment.baseImagesApiUrl}/${image.sizes[size].path}`;
  }
}
