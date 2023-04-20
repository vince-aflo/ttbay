import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Auction } from 'src/app/core/models/auction.model';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent implements OnInit {
  @Input() auction!:Auction;
  userEmail!:string;

  constructor(private router:Router, private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(){
    this.oidcSecurityService.getUserData().subscribe({
      next: (data) => {
        this.userEmail = data.email
        console.log(this.userEmail)

      }
    })
  }

  showAuctionDetails(){
    if (this.auction.auctioneerEmail && this.auction.status == 'END'){
      this.router.navigateByUrl(`/dashboard/completed-auction-detail/${this.auction.auctionId}`)
    } else if (this.auction.auctioneerEmail == this.userEmail){
      this.router.navigateByUrl(`/auction-detail/${this.auction.auctionId}`)
    } else if (this.auction.status != 'END') {
      this.router.navigateByUrl(`/live-auction-detail/${this.auction.auctionId}`)
    } else {
      this.router.navigateByUrl(`/dashboard/completed-auction-detail/${this.auction.auctionId}`)
    }
  }
}
