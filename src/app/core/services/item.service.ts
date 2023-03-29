import { Injectable } from '@angular/core';
import { Item} from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http:HttpClient) { }

  addItem(item:any){
    return this.http.post<Item>('http://localhost:8080/api/v1/items/add', item);
  }

  getItem(id:number){
    return this.http.get<Item>(`http://localhost:8080/api/v1/items/${id}`)
  }

  getCategories() {
    return this.http.get('http://localhost:8080/api/v1/categories/all')
  }

  getAllUserItemsOnAuction(){
    return this.http.get<Item[]>('http://localhost:8080/api/v1/items/on-auction' )
  }

  getAllUserItems(){
    return this.http.get<Item[]>('http://localhost:8080/api/v1/items/all-by-user')
  }

  deleteItem(id:number){
    return this.http.delete(`http://localhost:8080/api/v1/items/${id}`,{responseType:'text'})

  }

  deleteItemOnAuction(id:number){
    return this.http.delete(`http://localhost:8080/api/v1/items/on-auction/${id}`,{responseType:'text'})
  }
}
