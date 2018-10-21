import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { DataService } from "./data.service";

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any): any {
    switch (args2) {
      case 'price.desc':
        return args.sort((a, b) => {
          return b['price'] - a['price']
        });
        break;
      case 'price.asc':
        return args.sort((a, b) => {
          return a['price'] - b['price']
        });
        break;
      case 'ram':
        return args.sort((a, b) => {
          return  a['ramSize'].replace(/[^0-9]/gim,'') - b['ramSize'][0].replace(/[^0-9]/gim,'')
        });
        break;
      case 'rom':
        return args.sort((a, b) => {
          return b['romSize'][0].replace(/[^0-9]/gim,'') - a['romSize'].replace(/[^0-9]/gim,'')
        });
        break;
      case 'name':
        return args.sort((a, b) => {
          return a['name'] > b['name'] ? 1 : -1
        });
        break;
      case 'screen':
        return args.sort((a, b) => {
          return b['screenSize'] - a['screenSize']
        });
    }
    return value
  }

}
