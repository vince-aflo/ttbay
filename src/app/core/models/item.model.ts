export class Item {
    itemId:number;
    itemName: string;
    imageList: {id: number, imageUrl:string}[];
    category: string;
    condition: string;
    description: string;
    onAuction: boolean;
    isSold: boolean;
    tags: {id: number, name:string}[];
  
    constructor (
        itemId: number, itemName: string, 
        imageList: {id: number, imageUrl:string}[], 
        category: string,  
        condition: string, 
        description: string,
        onAuction: boolean,
        tags: {id: number, name:string}[],
        isSold: boolean) {
          this.itemId = itemId;
          this.itemName = itemName;
          this.imageList = imageList;
          this.category = category;
          this.condition = condition;
          this.description = description;
          this.onAuction = onAuction;
          this.isSold = isSold;
          this.tags = tags;
      }
}