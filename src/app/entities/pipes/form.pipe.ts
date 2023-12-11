import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'form',
  standalone: true
})
export class FormPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
