import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';

import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})

export class SellingComponent implements OnInit{
  showItemForm:boolean = false;
  showAuctionForm:boolean = false;
  savedItem!:Item;
  userAuctions!:Auction[];

  constructor(private router:Router,
    private auctionService:AuctionService,
    private toastService: ToastService){
    
  }

  ngOnInit(): void {
    this.auctionService.getAllAuctionsByUser().subscribe({
      next:(data) => {
        this.userAuctions = data;
      },
      error: (err) => {
        this.toastService.error('Could not fetch user auctions')
        console.error(err)
      }
    })
  }

  showAuctions(){
    return this.router.url.includes('auctions')
  }

  setSavedItem(item:Item){
    this.savedItem = item;
    this.showItemForm = false;
    this.showAuctionForm = !this.showItemForm;
  }

  revealItemForm(){
    this.showItemForm = true;
  }

  hideAllForms() {
    this.showItemForm = false;
    this.showAuctionForm = false;
    window.location.reload();
  }

  hideAuctionForm(status:boolean):void {
    this.showAuctionForm = status
    window.location.reload()
  }
}

