import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Auction} from "../models/auction.model"
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})

export class AuctionService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllAuctionsByUser(): Observable<Auction[]> {
    return this.http.get<Auction[]>(`${this.baseUrl}${ApiPaths.GetAllAuctionsByUser}`);
  }

  createAuction(body:any) {
    return this.http.post(`${this.baseUrl}${ApiPaths.CreateAuction}`, body, {observe: 'response', responseType: 'text'});
  }

  getAllAuctions() {
    return this.http.get<Auction[]>(`${this.baseUrl}${ApiPaths.GetAllAuctions}`);
  }

  getAuction(id:number) {
    return this.http.get<Auction>(`${this.baseUrl}${ApiPaths.GetAuction}/${id}`);
  }
  
  cancelAuctionWithBidCheck (id:number) {
    return this.http.delete(`${this.baseUrl}${ApiPaths.CancelAuctionWithBidCheck}/${id}`,{observe: 'response', responseType: 'text'});
  }

  cancelAuction(id: number) {
    return this.http.delete(`${this.baseUrl}/${ApiPaths.CancelAuction}/${id}`,{observe: 'response', responseType: 'text'});
  }
  
  updateAuction(body:any) {
    return this.http.put<Auction>(`${this.baseUrl}${ApiPaths.UpdateAuction}`, body);
  }
}
