import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpty',
})
export class FilterEmptyPipe implements PipeTransform {
  transform(values: string[]): string[] {
    return values.filter(value => !!value);
  }
}
