import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { Bid } from 'src/app/core/models/bid.model';
import { BidService } from 'src/app/core/services/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.scss']
})
export class BidFormComponent implements OnInit{
bidForm!:FormGroup;
auctionId!:number;
@Input() currentAuction!:Auction;
@Output() cancel:EventEmitter<boolean> = new EventEmitter();

constructor(private bidService:BidService,private toastService:ToastService,private router:Router){}

ngOnInit(): void {
  this.bidForm = new FormGroup({
    'bidAmount':new FormControl(null,[Validators.required,Validators.pattern('[0-9]*(\.[0-9]{0,2})?'),this.invalidAmount.bind(this)]),
    'auctionId':new FormControl(this.currentAuction.auctionId,Validators.required)
  })
  

}

makeBid(){
  const bid:Bid = new Bid(this.bidForm.value.bidAmount,this.bidForm.value.auctionId);
  this.bidService.makeBid(bid).subscribe({
    next:(data)=>{
      this.toastService.success("Bid has been successfully made")
      setTimeout(()=>{
        this.cancel.emit(false)
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

cancelForm(){
  this.cancel.emit(false);
}

invalidAmount(control:FormControl):{[s:string]:boolean} | null {
  if(control.value < this.currentAuction.reservedPrice){
    return {"amountIsLessThanReservedPrice":true}
  }
  return null
}

}
