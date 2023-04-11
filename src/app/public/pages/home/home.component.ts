import { Component } from '@angular/core';
import {Auction} from 'src/app/core/models/auction.model'
import {AuctionService} from 'src/app/core/services/auction.service'
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  auctions!: Auction[];
  title:string = "All Auctions";

  constructor(private auctionService: AuctionService, 
    private toastService: ToastService) {}

  ngOnInit() {
    this.auctionService.getAllAuctions().subscribe({
      next: (value) => {
        this.auctions = value.filter((auction) => auction.status == 'LIVE');
      },
      error: (err) => {
        this.toastService.error('Failed to fetch auctions')
        console.error(err)
      }
    })
  }
}
