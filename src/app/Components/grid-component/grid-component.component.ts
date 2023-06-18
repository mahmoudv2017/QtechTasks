import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import {ColumnDefinition , ObjectConfig, Record} from '../../types/types'
import { GlobalServiceService } from 'src/app/Services/global-service.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})



export class GridComponentComponent implements OnInit , OnChanges{


  ProjectedData!: Record[]


  maxPage!: number
  maxItems!: number
  PageNum!: number
  CheckedColumns:Record[] = []
  //SearchResults:Record[] = []
  @Input() rows!: Record[]
  @Input() options!:ObjectConfig

  @Input() columns!: ColumnDefinition[]
  @Output() RecordSelection = new EventEmitter()
  @Output() PaginatEmitter = new EventEmitter()
  //@Output() SearchEmitter = new EventEmitter()
  @Output() SortEmittter = new EventEmitter()


  constructor(private http:HttpClient
   //  , private translateservice:GlobalServiceService
     ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['rows'].currentValue != changes['rows'].previousValue){
      this.rows = changes['rows'].currentValue
      this.maxPage = Math.ceil(this.rows.length/this.maxItems)
      debugger
      let start = this.maxItems * (this.PageNum - 1)
      let end = this.maxItems * this.PageNum
      this.ProjectedData = changes['rows'].currentValue.slice(start,end)
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
    // if(this.options.ServerSide){
    //   this.PaginatEmitter.emit([start,end])
    //   return
    // }

    //     if( this.SearchResults.length != 0 ){

    //   this.ProjectedData = this.SearchResults.slice(start,end)
    //   return
    // }


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

    this.maxItems = this.options.ItemsPerPage <= 0 ? 5 : this.options.ItemsPerPage
    this.maxPage = Math.ceil(this.rows?.length / this.maxItems)

    var initialPage = this.options.InitialPaging <= 0 ? 1 : this.options.InitialPaging
    if(this.options.InitialPaging >= this.maxPage){
      initialPage = this.maxPage
    }
    //  this.translateservice.setLanguage(this.options.perfered_language)


    this.PageNum = initialPage



    if(this.options.isPaginateByApi){
      this.http.get(this.options.ApiPath).subscribe((res:any) => {


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

    this.ProjectedData.forEach((obj:Record) => {
      if(event.target.checked){
        this.CheckedColumns.push(obj)
      }else{
        this.CheckedColumns = this.CheckedColumns.filter( (local_obj:Record) => !Object.is(local_obj , obj)  )
      }
    })
  }

  CheckOne(event: any, index: number) {

    if(event.target.checked){
      this.CheckedColumns.push(this.ProjectedData[index])
    }else{
      this.CheckedColumns = this.CheckedColumns.filter( (local_obj:Record) => !Object.is(local_obj , this.ProjectedData[index])  )
    }

  }

  defaultsort(head:ColumnDefinition){
    let defaultDirection = (head.Default_Sorted == 'asc' ? 1 : -1)

    head.Default_Sorted = defaultDirection == 1 ? 'asc' : 'desc'


    debugger
    for(let i = 0 ; i < this.rows.length; i++){
      for(let y = 0 ; y < this.rows.length -i -1 ; y++){

        let leftside = defaultDirection == 1 ? y+1 : y
        let rightside = defaultDirection == 1 ? y : y+1

        if(this.rows[leftside ][ head.key] > this.rows[rightside][head.key]){
          let temp = this.rows[leftside]
          this.rows[leftside] = this.rows[rightside]
          this.rows[rightside] = temp
        }
      }

    }

    this.ProjectedData = this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)


  }
  // emitmysortdata(data:any){
  //   this.SortEmittter.emit(data)
  // }

  SortByColumn(rowsOnly:{[key:string]:number|string}[]){


    this.rows = rowsOnly
    this.updateTable()


  }

  // onSearch(event:any){
  //   debugger
  //   this.SearchResults = []
  //   if(event.target.value != ''){
  //     this.rows.forEach(rec => {
  //     if( (rec[this.options.PrimaryKey] as string).includes(event.target.value)){
  //       this.SearchResults.push(rec)
  //     }
  //    })

  //    this.maxPage = Math.ceil(this.SearchResults.length/this.maxItems)
  //    this.PageNum = 1
  //    this.ProjectedData = this.SearchResults.slice(0,this.maxItems)
  //   }


  //   if(this.SearchResults.length == 0){
  //     this.maxPage = Math.ceil(this.rows.length/this.maxItems)
  //     this.ProjectedData = this.rows.slice(0,this.maxItems)
  //   }

  // }
  updateTable(){
    this.ProjectedData = this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
  }

   ifChecked(record:Record){

    return this.CheckedColumns.includes(record)
  }
  // onRecordSelection(selectedrow:any , keys:string[]){

  //   let uniqueColumns = this.columns.filter(column =>  this.options.PrimaryKey.includes(column.key) )

  //   this.rows = this.rows.map((obj:any) => {
  //     let testkey = uniqueColumns.map(col => obj[col.key]).join("")

  //     if( keys.includes(testkey) ){

  //       if(selectedrow){
  //         this.CheckedColumns.push(obj)
  //         return obj
  //       }

  //       this.CheckedColumns = this.CheckedColumns.filter( (local_obj:any) => !Object.is(local_obj , obj)  )
  //     }
  //     return obj
  //   })

  //  // this.updateTable()
  // }

  // oninput(event:any){
  //   debugger
  //   var text = event.target.value
  //   this.SearchEmitter.emit([text])
  // }

}
