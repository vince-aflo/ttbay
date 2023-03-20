import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Auction} from "../models/auction.model"
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private apiUrl = 'http://localhost:8080/api/v1/auctions/all-by-user';

  constructor(private http:HttpClient) { }

  getAllAuctionsByUser(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.apiUrl);
  }

  createAuction(body:any){
    return this.http.post('http://localhost:8080/api/v1/auctions/add', body, {observe: 'response', responseType: 'text'})
  }

  getAllAuctions(){
    return this.http.get<Auction[]>('http://localhost:8080/api/v1/auctions/all')
  }
}
