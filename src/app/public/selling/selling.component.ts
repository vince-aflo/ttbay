import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

import { Item } from 'src/app/core/models/item.model';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})

export class SellingComponent {
  showItemForm:boolean = false;
  showAuctionForm:boolean = false;
  savedItem!:Item;

  constructor(private router:Router){
    
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

