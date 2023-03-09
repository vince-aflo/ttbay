import { Injectable } from '@angular/core';
import { Item} from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl1 = 'http://localhost:8080/api/v1/auctions/all-by-user';

  constructor(private http:HttpClient) { }

  addItem(item:any){
    return this.http.post('http://localhost:8080/api/v1/items/add', item, {observe: 'response', responseType:'text'});
  }

  getCategories() {
    return this.http.get('http://localhost:8080/api/v1/category/categories')
  }

  private apiUrl = 'http://localhost:8080/api/v1/auctions';

  
  private items: Item[] = [];


  getLiveAuctions(): Observable<Item[]> {
    //return this.httpClient.get<Item[]>(this.apiUrl);
    return of(this.items);
  }

  async getAllUserItemsOnAuction():Promise<Observable<Item[]>>{
    return this.http.get<Item[]>('http://localhost:8080/api/v1/auction/items/on-auction' )
  }

  getAllUserItems(){
    return this.http.get<Item[]>('http://localhost:8080/api/v1/items/all-by-user')
  }
}
