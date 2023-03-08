import { Injectable } from '@angular/core';
import { Item} from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/auctions';

  
  private items: Item[] = [
    {
      id: 1,
      name: "Office chair",
      imageUrl: "https://www.ulcdn.net/images/products/497793/original/Charles_Metal_Study_Chair_In_Black_Colour_LP.jpg?1674560816",
      startingPrice: 1200,
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },


  ];


  getLiveAuctions(): Observable<Item[]> {
    //return this.httpClient.get<Item[]>(this.apiUrl);
    return of(this.items);
  }

  async getAllUserItemsOnAuction():Promise<Observable<Item[]>>{
    return this.httpClient.get<Item[]>('http://localhost:8080/api/v1/auction/items/on-auction' )
  }
}
