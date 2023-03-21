import { Component } from '@angular/core';
import {Auction} from '../../core/models/auction.model'
import {AuctionService} from '../../core/services/auction.service'
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../core/models/item.model'
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
        this.auctions = value;
      },
      error: (err) => {
        this.toastService.error('Failed to fetch auctions')
        console.error(err)
      }
    })
  }
}
