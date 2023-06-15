import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { }

  setLanguage( value:string){localStorage.setItem("language" , value)}

  getLanguage(){return localStorage.getItem("language")}
}
