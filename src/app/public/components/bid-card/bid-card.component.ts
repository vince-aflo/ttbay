import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Auction } from 'src/app/core/models/auction.model';

@Component({
  selector: 'app-bid-card',
  templateUrl: './bid-card.component.html',
  styleUrls: ['./bid-card.component.scss']
})
export class BidCardComponent {
  @Input() auction!:Auction;

  constructor(private router:Router) {}

  showAuctionDetails(){
    if (this.auction.status != 'END') {
      this.router.navigateByUrl(`/live-auction-detail/${this.auction.auctionId}`)
    } else {
      this.router.navigateByUrl(`/dashboard/completed-auction-detail/${this.auction.auctionId}`)
    }
  }
}
