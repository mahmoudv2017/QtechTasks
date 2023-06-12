import { Component, Input, OnChanges, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';




interface Report {
  ID: number;
  address: string;
  category: string;
  priority: string;
  state: string;
  history: string;
  lastUpdate: string;
  time: string;
  reporter: string;
  JobNumber: number;
  management: string;
  belongsTo: string;
}

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})



export class GridComponentComponent implements OnInit, OnChanges {


  @Input() rows!: any
  maxPage!: number
  maxItems!: number
  ProjectedData: any
  FilteredNotProjectedData: any
  PageNum!: number

  @Input() options = {
    SortableColumns: [{ column: 'id', sortDirection: 'asc' }],
    InitialPaging: 1,
    ItemsPerPage: 5
  }

  @Input() columns!: [string]
  @Output() RecordSelection = new EventEmitter()

  constructor() {



  }
  ngOnChanges(changes: SimpleChanges): void {

    this.filterData()
    this.ProjectedData = this.ProjectedData.slice(5 * (this.PageNum - 1), this.maxItems * this.PageNum)
    debugger
  }

  filterData() {
    var allkeys = Object.keys(this.rows[0])
    var RemainngKeys = allkeys.filter(key => !this.columns.includes(key))
    this.ProjectedData = this.rows.map((obj: any) => ({ ...obj }))


    this.FilteredNotProjectedData = this.ProjectedData.map((obj: any) => {
      for (const key of RemainngKeys) {
        if (key != 'checked') {
          delete obj[key]
        }

      }
      return obj
    })

    debugger


  }
  ngOnInit(): void {
    var initialPage = this.options.InitialPaging || 1

    this.filterData()
    this.maxItems = this.options.ItemsPerPage || 5
    this.maxPage = Math.ceil(this.rows!.length / this.maxItems)
    this.PageNum = initialPage
    this.ProjectedData = this.ProjectedData.slice(5 * (initialPage - 1), this.maxItems)
  }

  //Pagination Part
  get next() {
    if (this.PageNum == this.maxPage) {
      return true
    }
    return false
  }

  get prev() {
    if (this.PageNum <= 1) {
      return true
    }
    return false
  }

  get Allchecked() {
    console.log('getting all checked')
    for (let i = 0; i < this.ProjectedData.length; i++) {
      if (this.ProjectedData[i].checked == false) {
        return false
      }
    }
    debugger
    return true

  }

  NextPage() {

    var nextpage = ++this.PageNum
    let start = this.maxItems * (nextpage - 1)
    let end = this.maxItems * nextpage
    this.ProjectedData = this.FilteredNotProjectedData.slice(start, end)
    console.log(this.rows)
  }
  PrevPage() {
    debugger
    var prevPage = --this.PageNum
    let start = this.maxItems * (prevPage - 1)
    let end = this.maxItems * prevPage
    this.ProjectedData = this.FilteredNotProjectedData.slice(start, end)
  }






  //CheckBox Part
  CheckAll(event: any) {

    let id_arr: any[] = []
    this.ProjectedData.forEach((element: any) => {
      id_arr.push(element['ID']);
    });

    this.RecordSelection.emit([id_arr, event.target.checked])

  }

  CheckOne(event: any, index: number) {

    let id_arr: any[] = []

    id_arr.push(this.ProjectedData[index]['ID']);

    this.RecordSelection.emit([id_arr, event.target.checked])

  }



}
