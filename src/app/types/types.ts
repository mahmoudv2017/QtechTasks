export interface ColumnDefinition{
  key:string,
  isSortable:boolean,
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
    PrimaryKey : string[]
    InitialPaging:number,
    perfered_language:string,
    ItemsPerPage:number

}
