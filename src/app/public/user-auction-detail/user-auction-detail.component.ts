import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-user-auction-detail',
  templateUrl: './user-auction-detail.component.html',
  styleUrls: ['./user-auction-detail.component.scss']
})
export class UserAuctionDetailComponent {
  auction!:Auction;
  currentImagePosition:number = 0
  showAuctionForm:boolean = false;

  constructor(private auctionService: AuctionService,
    private router:Router,
    private toastService: ToastService){}

  ngOnInit(): void {
    const routeInfo = this.router.url.split('/');
    const id = parseInt(routeInfo[routeInfo.length - 1])
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

  toggleAuctionFormVisibility(){
    this.showAuctionForm = !this.showAuctionForm;
  }

  previousImage(){
    if(this.currentImagePosition > 0) this.currentImagePosition--
  }

  nextImage(){
    if(this.currentImagePosition < this.auction.item.imageList.length - 1) this.currentImagePosition++
  }

}



 