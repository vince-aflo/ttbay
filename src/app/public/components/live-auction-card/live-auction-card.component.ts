import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction } from 'src/app/core/models/auction.model';

@Component({
  selector: 'app-live-auction-card',
  templateUrl: './live-auction-card.component.html',
  styleUrls: ['./live-auction-card.component.scss']
})
export class LiveAuctionCardComponent {
  @Input() liveAuction!:Auction

  constructor(private router:Router){}

  showAuctionDetails(){
    this.router.navigateByUrl(`/live-auction-detail/${this.liveAuction.auctionId}`)
  }
}
