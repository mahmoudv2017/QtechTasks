import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../Services/translate.service';



@Pipe({
  name: 'transaltePipe',
  pure:false
})
export class TransaltePipePipe implements PipeTransform {

  constructor(private TranslationServce:TranslateService){}

  transform(value: any , ...args: unknown[] ): unknown {
    return this.TranslationServce.transalte(value )

  }

}
