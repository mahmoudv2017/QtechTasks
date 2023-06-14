export interface ColumnDefinition{
  key:string,
  isSortable:boolean,
  type:any,
  perfered_width : number,
  isUnique:boolean,
  Default_Sorted : string
}

export interface ObjectConfig{


    isPaginateByApi : boolean,
    ApiPath : string,
    UniqueID : string,
    InitialPaging:number,
    ItemsPerPage:number

}
