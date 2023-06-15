import { Directive, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { ColumnDefinition } from '../types/types';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  constructor() { }
  @Input('appSort') data!:[any[] , ColumnDefinition]
  @Output() SortData = new EventEmitter()

  @HostListener("click"  )
  onCLick(){
    let head = this.data[1]
    let sort_rows = this.data[0]
    this
    if(!head.isSortable){return}


    let defaultDirection = (head.Default_Sorted == 'asc' ? -1 : 1)

    //this.head.Default_Sorted = defaultDirection == 1 ? 'asc' : 'desc'


    debugger
    for(let i = 0 ; i < sort_rows.length; i++){
      for(let y = 0 ; y < sort_rows.length -i -1 ; y++){

        let leftside = defaultDirection == 1 ? y+1 : y
        let rightside = defaultDirection == 1 ? y : y+1

        if(sort_rows[leftside][head.key] > sort_rows[rightside][head.key]){
          let temp = sort_rows[leftside]
          sort_rows[leftside] = sort_rows[rightside]
          sort_rows[rightside] = temp
        }
      }

    }

    head.Default_Sorted = head.Default_Sorted == 'asc' ? 'desc' : 'asc'
    this.SortData.emit(sort_rows)

  }



}



