import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction';
import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  showAuctions:boolean = true;
  showItemForm:boolean = false;
  showAuctionForm:boolean = false;

  auctions:Auction[] = [];
  items:Item[] = [];


  constructor(private itemService:ItemService, 
    private toastify:ToastService,
    private auctionService:AuctionService){
    
  }

  ngOnInit(): void {
    this.itemService.getAllUserItems().subscribe({
      next:(data) => {
        this.items = data;
      }
    })

    this.auctionService.getAllAuctionsByUser().subscribe({
      next:(data) => {
        this.auctions = data;
      }
    })
  }



  revealItemForm(){
    this.showItemForm = true;
  }

  hideAllForms() {
    this.showItemForm = false;
    this.showAuctionForm = false;
  }

  hideItemForm(status:boolean):void {
    this.showItemForm = status;
    this.showAuctionForm = !status;
  }

  hideAuctionForm(status:boolean):void {
    this.showAuctionForm = status
  }

  activateAuctionsTab(){
    this.showAuctions = true;
  }

  activateDraftsTab(){
    this.showAuctions = false;
  }
}

