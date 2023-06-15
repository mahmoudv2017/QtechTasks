import { Pipe, PipeTransform } from '@angular/core';
import { ColumnDefinition } from '../types/types';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {


  transform(value: any, ...args: ColumnDefinition[]): unknown {

    if(args[0].type == 'Date'){
      let date = new Date(value as string)
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }
    else if(args[0].isEnum )
    {
      return args[0].EnumValues[value]
    }
    return value

  }

}
