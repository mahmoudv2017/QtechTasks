import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {


  transform(value: unknown, ...args: unknown[]): unknown {
    if(args[0] == 'Date'){
      let date = new Date(value as string)
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }else{
      return value
    }

  }

}
