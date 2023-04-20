import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';

import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  showItemForm:boolean = false;
  showAuctionForm:boolean = false;
  savedItem!:Item;
  userAuctions!:Auction[];
  email:string = '' 
  name:string = ''

  constructor(private router:Router,
    private auctionService:AuctionService,
    private toastService: ToastService,
    private oidcSecurityService: OidcSecurityService,
    private userService: UserService){
    
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
    
    this.oidcSecurityService.checkAuth().subscribe(({ userData }) => {
      this.email = userData.email;
      this.userService.getProfile(this.email).then(data => {
        data.subscribe({
          next:(value) => {
            this.name = value.fullName;
          }
        })
      })
    })
  }

  showAuctions(){
    return this.router.url.includes('auctions')
  }

  showDrafts(){
    return this.router.url.includes('drafts')
  }

  showBids(){
    return this.router.url.includes('bids')
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

