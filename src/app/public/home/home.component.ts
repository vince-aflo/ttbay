import { Component } from '@angular/core';
import {Auction} from '../../core/models/auction.model'
import {AuctionService} from '../../core/services/auction.service'
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../core/models/item.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  auctions!: Auction[];
  title:string = "All Auctions";

  constructor(private auctionService: AuctionService, 
    private itemService:ItemService) {}

  ngOnInit() {
    this.auctionService.getAllAuctions().subscribe({
      next: (value) => {
        this.auctions = value;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  // public async getAllUserAuctionItems() {
      
  //   let response = await this.auctionService.getAllAuctionsByUser()
  //   response.subscribe({
  //     next: (response) => {
  //       this.auctions = response;
  //       console.log(response);
  //     },
  //     error:(error) => {
  //       console.log(error);

  //       if(error.error === "Empty Auctions" ){
  //         this.auctions = [];
  //       } 
  //     }
  //   })    
  // }

}
