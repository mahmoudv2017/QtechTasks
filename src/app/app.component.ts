import { Component } from '@angular/core';

const data = [


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
    "history" : "06/11/2023",
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
  ParentApiData:any
  config:{

      isPaginateByApi : boolean,
      ApiPath : string,
      UniqueID : string,
      InitialPaging:number,
      ItemsPerPage:number
  }
  columns:any[]

  constructor() {
  //send data to child with the necessary columns only
  this.columns = [{
    key:"address",
    isSortable:true,
    type:String,
    perfered_width : 20,
    Default_Sorted : 'asc'
  }, {
    key:"reporter",
    isSortable:true,
    type:String,
    perfered_width : 20,
    Default_Sorted : 'desc'
  },
  {
    key:"history",
    isSortable:true,
    type: Date ,
    perfered_width : 20,
    Default_Sorted : 'desc'
  }
]
  this.ParentApiData = data
  /*
.map(obj => {
    Object.keys(obj).forEach(key => {
      if(key != )
    })
  })
  */
    this.config={
      isPaginateByApi : true,
      ApiPath : '../data.json',
      UniqueID : 'ID',
      InitialPaging:1,
      ItemsPerPage:5
    }
    //need to improve




  }

  onRecordSelection(selectedrow:any){
    //listener for the developer to implement custom logic
    console.log(selectedrow)
  }


}
