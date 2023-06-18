
import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';


const dictionary_en:{[key:string]:string} =

{
  'رقم': 'ID',
 'العنوان ' : 'address',
  'الجنس' : "gender",
  'التاريخ' : "history"
}



const dictionary_ar:{[key:string]:string} =
{
  ID : 'رقم',
  address : "العنوان",
  gender : "الجنس",
  history : "التاريخ"
}

@Injectable({
  providedIn: 'root'
})


export class TranslateService {

  constructor(private GlobalService:GlobalServiceService) { }

  Servicelanguage:string = '';



  transalte(target_key:string){
    let targetDictionary = this.GlobalService.getLanguage()!.toLowerCase() == "english" ? dictionary_en : dictionary_ar

    if(targetDictionary.hasOwnProperty(target_key)){
          return targetDictionary[target_key]

    }
    return target_key

  }
}
