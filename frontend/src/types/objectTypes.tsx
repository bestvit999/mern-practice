export interface IShop {
    id : string,
    name : string
}
  
export interface IGroup {
    id : string, 
    shop : IShop
}

export interface IItem {
    id : string,
    groupId : string,
    name : string,
    number : number,
    price : number
}

export interface IGroupShop {
    groupId : string
    shopId : string
    shopName : string
}
