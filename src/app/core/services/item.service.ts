import { Injectable } from '@angular/core';
import { Item} from '../models/item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  addItem(item:any){
    return this.http.post<Item>(`${this.baseUrl}${ApiPaths.AddItem}`, item);
  }

  getItem(id:number){
    return this.http.get<Item>(`${this.baseUrl}${ApiPaths.GetItem}/${id}`);
  }

  getCategories() {
    return this.http.get(`${this.baseUrl}${ApiPaths.GetAllCategories}`);
  }

  getAllUserItemsOnAuction(){
    return this.http.get<Item[]>(`${this.baseUrl}${ApiPaths.GetAllUserItemsOnAuction}`);
  }

  getAllUserItems(){
    return this.http.get<Item[]>(`${this.baseUrl}${ApiPaths.GetAllUserItems}`);
  }

  deleteItem(id:number){
    return this.http.delete(`${this.baseUrl}${ApiPaths.DeleteItem}/${id}`, {responseType:'text'});
  }

  deleteItemOnAuction(id:number){
    return this.http.delete(`${this.baseUrl}${ApiPaths.DeleteItemOnAuction}/${id}`, {responseType:'text'});
  }
}
