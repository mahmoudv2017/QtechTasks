import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {ColumnDefinition , ObjectConfig} from '../../types/types'

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})



export class GridComponentComponent implements OnInit {


  ProjectedData: any


  maxPage!: number
  maxItems!: number
  PageNum!: number

  @Input() rows?: any
  @Input() options!:ObjectConfig

  @Input() columns!: ColumnDefinition[]
  @Output() RecordSelection = new EventEmitter()

  constructor(private http:HttpClient) {}


  ngOnInit(): void {
    this.init()
  }

  //Pagination Part
  get next() {

    return this.PageNum == this.maxPage

  }

  get prev() {
    return this.PageNum <= 1
  }

  get Allchecked() {
    debugger
    if(!this.ProjectedData){return false}
    for (let i = 0; i < this.ProjectedData.length; i++) {
      if (   !this.ProjectedData[i].hasOwnProperty('checked') || this.ProjectedData[i].checked == false) {
        return false
      }
    }
    return true

  }
  SliceTable(pagenum:number){
    //maxItems = 5 , pagenum = 2
    let start = this.maxItems * (pagenum - 1)
    let end = this.maxItems * pagenum
    //need to improv
    this.ProjectedData = this.rows.slice(start, end) //start = 5 , end = 10
  }
  NextPage() {

    var nextpage = ++this.PageNum
    this.SliceTable(nextpage)
  }
  PrevPage() {

    var prevPage = --this.PageNum
    this.SliceTable(prevPage)
  }



  init(){


    /*
  this.config={
      isPaginateByApi : true,
      ApiPath : '../data.json',
      UniqueID : 'ID',
      InitialPaging:1,
      ItemsPerPage:5
    }
    */
    var initialPage = this.options.InitialPaging <= 0 ? 1 : this.options.InitialPaging
    this.maxItems = this.options.ItemsPerPage <= 0 ? 5 : this.options.ItemsPerPage

    this.PageNum = initialPage

    this.maxPage = Math.ceil(this.rows?.length / this.maxItems)
    if(this.options.isPaginateByApi){
      this.http.get(this.options.ApiPath).subscribe((res) => {


            this.rows = res
            this.maxPage = Math.ceil(this.rows!.length / this.maxItems)
            //sorting step
            this.columns.forEach(colum => {
              this.SortByColumn(colum , true)
            })

            this.updateTable()

          })
    }else{

      this.updateTable()
    }
   // this.filterData()


  }


  //CheckBox Part
  CheckAll(event: any) {

    let id_arr: string[] = []
    let uniqueColumn = this.columns.filter(column => column.isUnique)
    this.ProjectedData.forEach((obj:any) => {

      let testkey = uniqueColumn.map(col => obj[col.key]).join("")
      id_arr.push(testkey);

    })
    this.onRecordSelection([id_arr, event.target.checked] ,id_arr)
    this.RecordSelection.emit([id_arr, event.target.checked])
    //

  }

  CheckOne(event: any, index: number) {

    let targetIndex = this.PageNum > 1 ? index + (this.maxItems) : index
    let uniqueColumn = this.columns.filter(column => column.isUnique)
    let key = uniqueColumn.map(column => this.rows[targetIndex][column.key]).join("")
    this.onRecordSelection([[key], event.target.checked] , [key])
    this.RecordSelection.emit([[key], event.target.checked])
  }

  BubbleSorter(){

  }

  SortByColumn(column:ColumnDefinition  , DefaultFlag:boolean){

    let defaultDirection = (column.Default_Sorted == 'asc' ? 1 : -1)
    let directtion = DefaultFlag ? defaultDirection : (defaultDirection == 1 ? -1 : 1)
    column.Default_Sorted = directtion == 1 ? 'asc' : 'desc'
    for(let i = 0 ; i < this.rows.length; i++){
      for(let y = 0 ; y < this.rows.length -i -1 ; y++){

        let leftside = directtion == 1 ? y+1 : y
        let rightside = directtion == 1 ? y : y+1

        if(this.rows[leftside][column.key] > this.rows[rightside][column.key]){
          let temp = this.rows[leftside]
          this.rows[leftside] = this.rows[rightside]
          this.rows[rightside] = temp
        }
      }

    }
   /* this.rows.sort((a:any, b:any) => {

        if (a[column.key] < b[column.key]) {
          return -1 * directtion;
        } else if (a[column.key] > b[column.key]) {
          return 1 * directtion;
        } else {
          return 0;
        }
      });*/

      this.updateTable()
  }


  updateTable(){
    this.ProjectedData = this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
  }

  onRecordSelection(selectedrow:any , keys:string[]){

    let uniqueColumns = this.columns.filter(column => column.isUnique)
    this.rows = this.rows.map((obj:any) => {
      let testkey = uniqueColumns.map(col => obj[col.key]).join("")
      if( keys.includes(testkey) ){
        return {...obj , checked:selectedrow[1]}
      }
      return obj
    })

    this.updateTable()
  }


}
