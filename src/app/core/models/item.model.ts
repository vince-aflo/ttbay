export class Item {
    id:number;
    name: string;
    imageUrl: string;
    startingPrice : number;
    condition: string;
    description?: string;
  
    constructor(id: number, name: string, imageUrl: string, startingPrice: number,  condition: string,  description?: string){
      this.id= id;
      this.name = name;
      this.imageUrl = imageUrl;
      this.startingPrice = startingPrice; 
      this.condition = condition;
      this.description = description;
    }
}
