import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { BidService } from 'src/app/core/services/bid.service';
import { UserService } from 'src/app/core/services/user.service';
import { Bid } from 'src/app/core/models/bid.model';


@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss']
})
export class AuctionDetailComponent {
  auction!:Auction;
  routeInfo = this.router.url.split('/');
  id = parseInt(this.routeInfo[this.routeInfo.length - 1])
  currentImagePosition:number = 0;
  showAuctionForm:boolean = false;
  showBidForm:boolean = false;
  bidCount!:number;
  auctioneer!:any;
  hourCount!: number;
  minCount!: number;
  secCount!: number;
  daysLeft!: number;
  hoursLeft!: number;
  auctioneerEmail!: string;
  bidInput!: number;
  showEmptyFieldError = false;
 

  constructor(private auctionService: AuctionService,
    public router:Router,
    private toastService: ToastService,
    private bidService: BidService,
    private oidcSecurityService:OidcSecurityService,
    private userService : UserService){}

  ngOnInit(): void {
    
    //get auction
    this.auctionService.getAuction(this.id).subscribe({
      next:(data) => {
        this.auction= data;
        this.getAuctioneer();
      },
      error:(err) => {
        this.toastService.error('Could not fetch auction')
        console.error(err);
      }
    })


    //get bid
    this.bidService.getBidCount(this.id).subscribe({
      next:(data) => {
        this.bidCount = Number(data);

      },
      error:(err) => {
        console.error(err);
        this.toastService.error("Cannot fetch bids on this auction");
      }
    })
    

   

     let difference = new Date(this.auction && this.auction.endDate).getTime() - new Date().getTime()
     difference = difference / (60000 * 60 * 24)
     this.daysLeft = Math.floor(difference);
     (this.daysLeft < 1) ? this.showCountDownTimer() : this.hoursLeft = Math.floor((difference - this.daysLeft) * 24) 
 
  }
  

  getAuctioneer(){
    this.userService.getProfile(this.auction.auctioneerEmail).then(data => {
      data.subscribe({
        next: (response) => {
            this.auctioneer = response;   
            console.log(response)
        }
      })
    });
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

  toggleBidForm(){
    this.showBidForm = !this.showBidForm
  }

  showCountDownTimer(){
    //probably better setting different setInterval functions for hours, mins and secs?
    setInterval(() => {
      let difference = new Date(this.auction.endDate).getTime() - new Date().getTime()
      this.hourCount = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minCount = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      this.secCount = Math.floor((difference % (1000 * 60)) / 1000);
    }, 1000)
  }

  scrollToLocation(): void {
    this.locationToScrollTo.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  placeBid(){
   //CHECK FOR EMPTY FIELD 
   if (this.bidInput == null) {
    this.showEmptyFieldError = true;
    
  }else{
    const bid:Bid = new Bid(this.bidInput,this.id);
    this.bidService.makeBid(bid).subscribe({
      next:(data)=>{
        this.toastService.success("Bid has been successfully made")
        setTimeout(()=>{
          window.location.reload()
        },300)
  
      },
      error: (err) => {
        if(err.error === "Bid is less than current maximum bid"){
          this.toastService.error("Bid is less than current maximum bid")
        }else{
        this.toastService.error("Could not make bid on auction")
        }
      }
    });
  }
  }
 
}
