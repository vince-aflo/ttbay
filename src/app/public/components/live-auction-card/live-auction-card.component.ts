import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auction } from 'src/app/core/models/auction.model';
import { BidService } from 'src/app/core/services/bid.service';

@Component({
  selector: 'app-live-auction-card',
  templateUrl: './live-auction-card.component.html',
  styleUrls: ['./live-auction-card.component.scss']
})
export class LiveAuctionCardComponent implements OnInit {
  @Input() liveAuction!:Auction
  daysLeft!:number;
  hoursLeft!:number;
  hourCount!:number;
  minCount!:number;
  secCount!:number;
  bidCount!:any;
  // countdown;

  constructor(private router:Router, private bidService: BidService){}

  ngOnInit(): void {
    this.liveAuction && this.bidService.getBidCount(this.liveAuction.auctionId).subscribe({
      next:(value) => {
        console.log(value)
        this.bidCount = value
      }
    })

    let difference = new Date(this.liveAuction.endDate).getTime() - new Date().getTime()
    difference = difference / (60000 * 60 * 24)
    this.daysLeft = Math.floor(difference);
    (this.daysLeft < 1) ? this.showCountDownTimer() : this.hoursLeft = Math.floor((difference - this.daysLeft) * 24) 
  }

  showAuctionDetails(){
    this.router.navigateByUrl(`/live-auction-detail/${this.liveAuction.auctionId}`)
  }

  showCountDownTimer(){
    //probably better setting different setInterval functions for hours, mins and secs?
    setInterval(() => {
      let difference = new Date(this.liveAuction.endDate).getTime() - new Date().getTime()
      this.hourCount = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minCount = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.secCount = Math.floor((difference % (1000 * 60)) / 1000);
    }, 1000)
  }
}
