import { Component, Input, OnInit } from '@angular/core';
import { Auction } from 'src/app/core/models/auction';
import { AuctionService } from 'src/app/core/services/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent implements OnInit{
  auctions:Auction[] = [];

  constructor(private auctionService: AuctionService){}

  ngOnInit(): void {
    this.auctionService.getAllAuctionsByUser().subscribe({
      next:(data) => {
        this.auctions = data;
      }
    })
  }
}
