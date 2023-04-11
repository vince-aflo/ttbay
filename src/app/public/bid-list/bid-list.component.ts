import { Component } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { BidService } from 'src/app/core/services/bid.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent {
  bids!:any;

  constructor(private bidService: BidService,
    private toastService: ToastService){}

  ngOnInit(): void {
    this.bidService.getAllBidsByUser().subscribe({
      next:(data) => {
        this.bids = data
        console.log(data)
      },
      error:(err) => {
        this.toastService.error('Could not fetch user auctions')
        console.error(err)
      }
    })
  }
}

