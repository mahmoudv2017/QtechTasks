import { Component } from '@angular/core';
import {ColumnDefinition , ObjectConfig , Record} from '../app/types/types'

const data:any[] = [


{
    "ID" : 1090,
    "address" : "12 Main St",
    "category" : "maintenance",
    "priority" : "low",
    "state":"in progress",
    "history" : "06/01/2023",
    "lastUpdate" : "06/10/2023",
    "time" : "10:30",
    "reporter" : "John Smith",
    "gender" : 1,
    "JobNumber" : 123456,
    "management" : "Facilities",
    "belongsTo" : "Building A"
  },


{
    "ID" : 1091,
    "address" : "45 Elm St",
    "category" : "security",
    "priority" : "high",
    "state":"closed",
    "gender" : 1,
    "history" : "05/25/2023",
    "lastUpdate" : "06/01/2023",
    "time" : "13:45",
    "reporter" : "Jane Doe",
    "JobNumber" : 654321,
    "management" : "Security",
    "belongsTo" : "Building B"
  },
 {
    "ID" : 1092,
    "address" : "789 Oak Ave",
    "category" : "cleaning",
    "gender" : 1,
    "priority" : "medium",
    "state":"assigned",
    "history" : "06/10/2023",
    "lastUpdate" : "06/11/2023",
    "time" : "08:00",
    "reporter" : "Bob Johnson",
    "JobNumber" : 987654,
    "management" : "Housekeeping",
    "belongsTo" : "Building C"
  },

 {
    "ID" : 1093,
    "address" : "1010 Maple Rd",
    "category" : "maintenance",
    "priority" : "high",
    "state":"closed",
    "gender" : 1,
    "history" : "06/05/2023",
    "lastUpdate" : "06/06/2023",
    "time" : "14:15",
    "reporter" : "Sarah Lee",
    "JobNumber" : 456789,
    "management" : "Facilities",
    "belongsTo" : "Building A"
  },
 {
    "ID" : 1094,
    "address" : "1313 Mockingbird Ln",
    "category" : "security",
    "priority" : "medium",
    "state":"in progress",
    "history" : "06/08/2023",
    "lastUpdate" : "06/10/2023",
    "time" : "11:00",
    "reporter" : "Tom Jones",
    "gender" : 0,
    "JobNumber" : 159357,
    "management" : "Security",
    "belongsTo" : "Building B"
  },

{
    "ID" : 1095,
    "address" : "2468 Vine St",
    "category" : "cleaning",
    "priority" : "low",
    "state":"assigned",
    "history" : "11/06/2023",
    "gender" : 1,
    "lastUpdate" : "06/12/2023",
    "time" : "09:30",
    "reporter" : "Lisa Smith",
    "JobNumber" : 753159,
    "management" : "Housekeeping",
    "belongsTo" : "Building C"
  },
{
    "ID" : 1096,
    "address" : "369 Oak St",
    "category" : "maintenance",
    "priority" : "medium",
    "state":"closed",
    "gender" : 1,
    "history" : "06/02/2023",
    "lastUpdate" : "06/03/2023",
    "time" : "16:00",
    "reporter" : "Mike Johnson",
    "JobNumber" : 258369,
    "management" : "Facilities",
    "belongsTo" : "Building A"
  },

{
    "ID" : 1097,
    "address" : "555 Elm St",
    "category" : "security",
    "priority" : "high",
    "state":"in progress",
    "history" : "06/07/2023",
    "lastUpdate" : "06/09/2023",
    "gender" : 0,
    "time" : "12:30",
    "reporter" : "Karen Lee",
    "JobNumber" : 951753,
    "management" : "Security",
    "belongsTo" : "Building B"
  },

{
    "ID" : 1098,
    "address" : "777 Maple Ave",
    "category" : "cleaning",
    "priority" : "high",
    "state":"assigned",
    "history" : "06/09/2023",
    "lastUpdate" : "06/10/2023",
    "gender" : 1,
    "time" : "07:00",
    "reporter" : "Adam Jones",
    "JobNumber" : 753951,
    "management" : "Housekeeping",
    "belongsTo" : "Building C"
  },

{
    "ID" : 1099,
    "address" : "888 Vine Rd",
    "category" : "maintenance",
    "priority" : "low",
    "state":"closed",
    "history" : "06/04/2023",
    "lastUpdate" : "06/05/2023",
    "gender" : 0,
    "time" : "15:00",
    "reporter" : "Emily Smith",
    "JobNumber" : 369258,
    "management" : "Facilities",
    "belongsTo" : "Building A"
  }

]


// "ID"
// "address"
// "category"
// "priority"
// "state"
// "history"
// "lastUpdate"
// "time"
// "reporter"
// "JobNumber"
// "management"
// "belongsTo"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QteckTask4';
  ParentApiData!:Record[]
  config:ObjectConfig
  row_data?:Record[]
  CheckedColumns:any[] = []

  columns:ColumnDefinition[]

  constructor() {
  //send data to child with the necessary columns only
  this.columns = [

  {
    key:"ID",
    isSortable:true,
    displayColumn:"رقم",
    type:'number',
    perfered_width : 20,
    Default_Sorted : 'asc'
  },
    {
    key:"address",
    isSortable:true,
    displayColumn:"Address",
    type:'string',
    perfered_width : 20,

  }, {
    key:"gender",
    isSortable:false,
    type:'string',
    displayColumn:"Gender",
    isEnum:true,
    EnumValues: {0 : 'female' , 1 : 'male'},
    perfered_width : 20,

  },
  {
    key:"history",
    isSortable:true,
    displayColumn:"History",
    type: 'Date' ,
    perfered_width : 20,

  }
]

  const remaing = this.columns.map(arr => arr.key)
  const ObjectKeys = Object.keys(data[0])
  this.row_data = data
  this.ParentApiData = data.map(obj => {
    //sending only the right columns
    ObjectKeys.forEach(key => {
      if(!remaing.includes(key)){
        delete obj[key]
      }
    })
      return obj

    })


    this.config={
      isPaginateByApi : false,
      ApiPath : 'assets/data.json',
      InitialPaging:1,
     // ServerSide:true,
      PrimaryKey : 'address',
      //perfered_language:'english',
      ItemsPerPage:5
    }





  }

  onPagination(pagenums:any){
    debugger
    this.ParentApiData = this.row_data!.slice(pagenums[0] , pagenums[1])
    console.log(this.ParentApiData)
  }

  onRecordSelection(selectedrow:any){
    //listener for the developer to implement custom logic
    //this.row_data![selectedrow[1]] = {...selectedrow[0] , checked:}
    console.log("evemt listener")
  }


  onSorting(sortConfig:any){
    let column:ColumnDefinition = sortConfig[0]
    column.Default_Sorted = column.Default_Sorted == 'asc' ? 'desc' : 'asc'

    let sortDirection = column.Default_Sorted == 'desc' ? 1 : -1
    debugger
    this.row_data!.sort((a:any, b:any) => {

      if (a[column.key] < b[column.key]) {
        return -1 * sortDirection;
      } else if (a[column.key] > b[column.key]) {
        return 1 * sortDirection;
      } else {
        return 0;
      }
    });
    this.columns = this.columns.map(col => {
      if(col.key == column.key){
        col.Default_Sorted = column.Default_Sorted
      }
      return col
    })
    this.ParentApiData = this.row_data!.slice(sortConfig[1] , sortConfig[2])
    debugger
  }

}


  // onSearch(reciveeddata:any){
  //   debugger
  //   this.row_data = data!.filter( (rec:any) => ( rec[this.config.PrimaryKey] as string).includes(reciveeddata[0]) )
  //   this.ParentApiData = this.row_data
  // }
