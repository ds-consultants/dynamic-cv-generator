import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'parametrize'})
export class ParametrizePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().trim().replace(/ /g, '-');
  }
}
