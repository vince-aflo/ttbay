import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
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
  showPendingBidPopUp:boolean = false;
  currentAuctionId:number = 0;

  constructor(private auctionService: AuctionService,
    private router:Router,
    private thisRoute:ActivatedRoute,
    private toastService: ToastService,
    private itemService: ItemService){}

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

    this.currentAuctionId = +this.thisRoute.snapshot.params['id'];
  }

  hideAllForms() {
    this.showAuctionForm = false;
    window.location.reload();
  }

  toggleAuctionFormVisibility(){
    this.showAuctionForm = !this.showAuctionForm;
  }

  previousImage(){
    if(this.currentImagePosition > 0) this.currentImagePosition--
  }

  nextImage(){
    if(this.currentImagePosition < this.auction.item!.imageList.length - 1) this.currentImagePosition++
  }


  deleteItemOnAuction(){
    this.itemService.deleteItemOnAuction(this.auction.item.itemId).subscribe(
      {
        next:(value)=> {
          console.log(value)
          if(value === "Item on auction has bid(s)"){
            this.showPendingBidPopUp = true
          }else{
            this.toastService.success("item deleted successfully")
            this.router.navigateByUrl('/sell/auctions')
          }
          
        },
        error:(error) => {
          this.toastService.error("Could not delete item")
        }
      }
    )
  }


  changeModalStatus(status:boolean){
    this.showPendingBidPopUp = status
  }
}



 