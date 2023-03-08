import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { Item } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  title:string = "My Live Auctions";

  liveAuctions:Item[] = [];

  dummyData:Item[] = [
    {
      id: 1,
      name: "Office chair",
      imageUrl: "https://www.ulcdn.net/images/products/497793/original/Charles_Metal_Study_Chair_In_Black_Colour_LP.jpg?1674560816",
      startingPrice: 1200,
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
    {
      id: 2,
      name: "Office table",
      imageUrl: "https://stylesatlife.com/wp-content/uploads/2019/11/best-office-table-designs.jpg",
      startingPrice: 2500,  
      condition: "new",
      description: "Good"
    },
  ];

  constructor(private itemService:ItemService, 
    private toastify:ToastService,
    private http:HttpClient){
    
  }

  ngOnInit(): void {
    // this.getAllUserAuctionItems();

  }

  public async getAllUserAuctionItems() {
    
      let response = await this.itemService.getAllUserItemsOnAuction()
      response.subscribe({
        next: (response) => {
          this.liveAuctions = response;
        },
        error:(error) => {
          if(error.error === "User currently has no items" || error.error === "User has no items on auction"){
            this.liveAuctions = [];
          } else{
            this.toastify.error(error.error)
          }
        }
      })
  }

  showItemForm:boolean = false;
  showAuctionForm:boolean = false;

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
}

