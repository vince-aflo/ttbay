import { Component } from '@angular/core';
import {Auction} from '../../core/models/auction'
import {AuctionService} from '../../core/services/auction.service'
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../core/models/item.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  auctions?: Auction[];
  title:string = "My Live Auctions";
  liveAuctions?: Item[];

  constructor(private auctionService: AuctionService, 
    private itemService:ItemService) {}

  ngOnInit() {
    // Get live items from the ItemService
    // this.auctionService.getAllAuctionsByUser().subscribe(my_auctions =>
    //    this.auctions = my_auctions
      
    // );
    this.getAllUserAuctionItems();
    // Get live items from the ItemService
    this.itemService.getLiveAuctions().subscribe((items: Item[]) => {
      // Assign the items to the liveAuction's array
      this.liveAuctions = items;
      
    });
   
  }

  public async getAllUserAuctionItems() {
      
    let response = await this.auctionService.getAllAuctionsByUser()
    response.subscribe({
      next: (response) => {
        this.auctions = response;
        console.log(response);
      },
      error:(error) => {
        console.log(error);

        if(error.error === "Empty Auctions" ){
          this.auctions = [];
        } 
      }
    })    
  }

}
