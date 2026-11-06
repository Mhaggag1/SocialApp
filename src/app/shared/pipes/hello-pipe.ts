import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hello',
})
export class HelloPipe implements PipeTransform {
  transform(userName: string): string {
    return `Hello ${userName}`;
  }
}
