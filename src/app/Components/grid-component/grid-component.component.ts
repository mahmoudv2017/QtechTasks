import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {ColumnDefinition , ObjectConfig} from '../../types/types'
import { GlobalServiceService } from 'src/app/Services/global-service.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})



export class GridComponentComponent implements OnInit , OnChanges{


  ProjectedData: any


  maxPage!: number
  maxItems!: number
  PageNum!: number
  CheckedColumns:any = []
  @Input() rows?: any
  @Input() options!:ObjectConfig

  @Input() columns!: ColumnDefinition[]
  @Output() RecordSelection = new EventEmitter()
  @Output() PaginatEmitter = new EventEmitter()
  @Output() SortEmittter = new EventEmitter()


  constructor(private http:HttpClient , private translateservice:GlobalServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {

    if(changes['rows'].currentValue != changes['rows'].previousValue){
      this.rows = changes['rows'].currentValue
      this.ProjectedData = changes['rows'].currentValue
      //this.updateTable()
    }
  }


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
      if (   !this.CheckedColumns.includes(this.ProjectedData[i])) {
        return false
      }
    }
    return true

  }


  SliceTable(pagenum:number){
    //maxItems = 5 , pagenum = 2
    debugger
    let start = this.maxItems * (pagenum - 1)
    let end = this.maxItems * pagenum

    this.ProjectedData = this.rows.slice(start, end) //start = 5 , end = 10

    //need to improv
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

      this.translateservice.setLanguage(this.options.perfered_language)


    this.PageNum = initialPage

    this.maxPage = Math.ceil(this.rows?.length / this.maxItems)

    if(this.options.isPaginateByApi){
      this.http.get(this.options.ApiPath).subscribe((res) => {


            this.rows = res
            this.maxPage = Math.ceil(this.rows!.length / this.maxItems)

            this.columns.forEach(colum => {
              if(colum.Default_Sorted){
                this.defaultsort(colum )
            }
          })


          })
    }else{

      this.columns.forEach(colum => {
        if(colum.Default_Sorted){
          this.defaultsort(colum )
      }


     })

    }
   // this.filterData()


  }


  //CheckBox Part
  CheckAll(event: any) {

    let id_arr: string[] = []
    let uniqueColumn = this.columns.filter(column => this.options.PrimaryKey.includes(column.key))
    this.ProjectedData.forEach((obj:any) => {

      let testkey = uniqueColumn.map(col => obj[col.key]).join("")
      id_arr.push(testkey);

    })
    this.onRecordSelection( event.target.checked,id_arr)
    this.RecordSelection.emit([id_arr, event.target.checked])
    //

  }

  CheckOne(event: any, index: number) {

    let targetIndex = this.PageNum > 1 ? index + (this.maxItems) : index

    let key = this.columns.map(column => {
      if( this.options.PrimaryKey.includes(column.key)) {return this.rows[targetIndex][column.key]}
      return null
    }).join("")
   // let uniqueColumn = this.columns.filter(column => this.options.PrimaryKey.includes(column.key))
    //let key = uniqueColumn.map(column => this.rows[targetIndex][column.key]).join("")
    this.onRecordSelection( event.target.checked , [key])
    this.RecordSelection.emit([[key], event.target.checked])
  }

  defaultsort(head:ColumnDefinition){
    let defaultDirection = (head.Default_Sorted == 'asc' ? 1 : -1)

    head.Default_Sorted = defaultDirection == 1 ? 'asc' : 'desc'


    debugger
    for(let i = 0 ; i < this.rows.length; i++){
      for(let y = 0 ; y < this.rows.length -i -1 ; y++){

        let leftside = defaultDirection == 1 ? y+1 : y
        let rightside = defaultDirection == 1 ? y : y+1

        if(this.rows[leftside][head.key] > this.rows[rightside][head.key]){
          let temp = this.rows[leftside]
          this.rows[leftside] = this.rows[rightside]
          this.rows[rightside] = temp
        }
      }

    }

    this.ProjectedData = this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)


  }


  SortByColumn(rowsOnly:any){


    this.rows = rowsOnly
    this.updateTable()


  }


  updateTable(){
    this.ProjectedData = this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
  }

   ifChecked(record:any){

    return this.CheckedColumns.includes(record)
  }
  onRecordSelection(selectedrow:any , keys:string[]){

    let uniqueColumns = this.columns.filter(column =>  this.options.PrimaryKey.includes(column.key) )

    this.rows = this.rows.map((obj:any) => {
      let testkey = uniqueColumns.map(col => obj[col.key]).join("")

      if( keys.includes(testkey) ){

        if(selectedrow){
          this.CheckedColumns.push(obj)
          return obj
        }

        this.CheckedColumns = this.CheckedColumns.filter( (local_obj:any) => !Object.is(local_obj , obj)  )
      }
      return obj
    })

   // this.updateTable()
  }


}
