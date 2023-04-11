import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bid } from '../models/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private http:HttpClient) { }

  makeBid(bid:Bid){
    return this.http.post('http://localhost:8080/api/v1/bids', bid,{responseType:"text"});
  }

  getAllBidsByUser(){
    return this.http.get('http://localhost:8080/api/v1/bids/all-by-user')
  }
}
