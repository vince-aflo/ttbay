import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from '../models/bid.model';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})

export class BidService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  makeBid(bid:Bid){
    return this.http.post(`${this.baseUrl}${ApiPaths.MakeBid}`, bid,{responseType:"text"});
  }

  getAllBidsByUser(){
    return this.http.get(`${this.baseUrl}${ApiPaths.GetAllBidsByUser}`);
  }

  getBidCount(auctionId:number) {
    return this.http.get(`${this.baseUrl}${ApiPaths.GetBidCount}/${auctionId}`);
  }
}
