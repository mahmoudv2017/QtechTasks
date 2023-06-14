import { Directive, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { ColumnDefinition } from '../types/types';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  constructor(private elemnt:ElementRef) { }
  @Input('appSort') head!:ColumnDefinition
  @Output() SortData = new EventEmitter()

  @HostListener("click"  )
  onCLick(){

    if(!this.head.isSortable){return}

    this.SortData.emit()

  }

}
