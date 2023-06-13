import { Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})



export class GridComponentComponent implements OnInit {


  //filterd arrays
  FilteredNotProjectedData: any
  ProjectedData: any
  //AllDataAfterPagination: any

  maxPage!: number
  maxItems!: number
  PageNum!: number

  @Input() rows!: any
  @Input() options!:any

  @Input() columns!: string[]
  @Output() RecordSelection = new EventEmitter()

  constructor() {}


  filterData() {

    var allkeys = Object.keys(this.rows[0])
    var RemainngKeys = allkeys.filter(key => !this.columns.includes(key))

    //need to improve
    this.ProjectedData = this.rows.map((obj: any) => ({ ...obj }))


    this.FilteredNotProjectedData = this.ProjectedData.map((obj: any) => {
      for (const key of RemainngKeys) {
        if(key != 'checked'){
          delete obj[key]
        }



      }
      return obj
    })

    debugger


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
    this.ProjectedData = this.FilteredNotProjectedData.slice(start, end) //start = 5 , end = 10
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

    var initialPage = this.options.InitialPaging || 1
    this.maxItems = this.options.ItemsPerPage || 5

    this.filterData()
    this.maxPage = Math.ceil(this.rows!.length / this.maxItems)
    this.PageNum = initialPage

    this.ProjectedData = this.ProjectedData.slice(5 * (initialPage - 1), this.maxItems)
  }


  //CheckBox Part
  CheckAll(event: any) {

    let id_arr: string[] = []

    this.rows.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
    .forEach((element: any) => {
      id_arr.push(element['ID']);
    });

    this.onRecordSelection([id_arr, event.target.checked])
    this.RecordSelection.emit([id_arr, event.target.checked])
    //

  }

  CheckOne(event: any, index: number) {
debugger
    let id_arr: any[] = []
    let targetIndex = this.PageNum > 1 ? index + (this.maxItems) : index

    //need to improv
    id_arr.push(this.rows[targetIndex]['ID']);
    this.onRecordSelection([id_arr, event.target.checked])
    this.RecordSelection.emit([id_arr, event.target.checked])
   //this.onRecordSelection([id_arr, event.target.checked])

  }

  SortByColumn(column:string , SortDirection:string){
    let directtion = (SortDirection == 'asc' ? 1 : -1)
    //need to improv
    this.rows.sort((a:any, b:any) => {

        if (a[column] < b[column]) {
          return -1 * directtion;
        } else if (a[column] > b[column]) {
          return 1 * directtion;
        } else {
          return 0;
        }
      });

      this.updateTable()
  }


  updateTable(){


    this.filterData()
    this.ProjectedData = this.ProjectedData.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
  }

  onRecordSelection(selectedrow:any){
    this.rows = this.rows.map((obj:any) => {
      if( selectedrow[0].includes(obj['ID']) ){
        return {...obj , checked:selectedrow[1]}
      }
      return obj
    })
    this.ProjectedData = this.FilteredNotProjectedData.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
    //console.log(selectedrow)
  }


}
