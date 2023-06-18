export interface ColumnDefinition{
  key:string,
  isSortable:boolean,
  displayColumn:string,
  type:any,
  perfered_width : number,
  //isUnique:boolean,
  isEnum?:boolean,
  EnumValues? :any
  perfered_language?:string,
  Default_Sorted? : string
}

export interface ObjectConfig{


    isPaginateByApi : boolean,
    ApiPath : string,
    PrimaryKey : string
    InitialPaging:number,
   // perfered_language:string,
    ItemsPerPage:number

}

export interface Record{
  [key:string]:string|number
  // ID : number,
  // address : string,
  // category : string,
  // priority : string,
  // state:string,
  // history : string,
  // lastUpdate : string,
  // gender : number,
  // time : string,
  // reporter : string,
  // JobNumber : number,
  // management : string,
  // belongsTo : string
}
