export class Item {
    itemId:number;
    itemName: string;
    imageList: {id: number, imageUrl:string}[];
    category: string;
    condition: string;
    description: string;
    onAuction: boolean;
    isSold: boolean;
  
    constructor (
        itemId: number, itemName: string, 
        imageList: {id: number, imageUrl:string}[], 
        category: string,  
        condition: string, 
        description: string,
        onAuction: boolean,
        isSold: boolean) {
          this.itemId = itemId;
          this.itemName = itemName;
          this.imageList = imageList;
          this.category = category;
          this.condition = condition;
          this.description = description;
          this.onAuction = onAuction;
          this.isSold = isSold;
      }
}
