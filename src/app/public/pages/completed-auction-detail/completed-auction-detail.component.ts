import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { BidService } from 'src/app/core/services/bid.service';

@Component({
  selector: 'app-completed-auction-detail',
  templateUrl: './completed-auction-detail.component.html',
  styleUrls: ['./completed-auction-detail.component.scss']
})
export class CompletedAuctionDetailComponent {
  auction!:Auction;
  userEmail!:string;
  bidCount!:number;
  id!:number;

  constructor(private auctionService: AuctionService,
    private router:Router,
    private toastService: ToastService,
    private oidcSecurityService: OidcSecurityService,
    private bidService: BidService){}

  ngOnInit(): void {
    const routeInfo = this.router.url.split('/');
    const id = parseInt(routeInfo[routeInfo.length - 1])

    this.oidcSecurityService.getUserData().subscribe({
      next: (data) => {
        this.userEmail = data.email
      }
    })

    this.bidService.getBidCount(id).subscribe({
      next:(data) => {
        this.bidCount = Number(data)
      }
    })

    this.auctionService.getAuction(id).subscribe({
      next:(data) => {
        this.auction = data;
      },
      error:(err) => {
        this.toastService.error('Could not fetch item info')
        console.error(err);
      }
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
