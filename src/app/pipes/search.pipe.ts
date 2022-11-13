import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchValue: string): any {
    if (!value) return;
    if (!searchValue) return value;
    let filterValues: any = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i].bookName.toLowerCase().includes(searchValue.toLowerCase())) {
        filterValues.push(value[i]);
      }
    }
    return filterValues;
  }
}
