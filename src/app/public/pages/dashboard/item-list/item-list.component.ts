import { Component, OnInit } from '@angular/core';
import {Item} from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items:Item[] = [];
  fullName!:string | null;
  showItemForm:boolean = false;
  showAuctionForm:boolean = false;
  savedItem!:Item;

  constructor(private itemService: ItemService,
    private toastService: ToastService){}

  ngOnInit(): void {
    this.fullName = sessionStorage.getItem('fullName')
    this.itemService.getAllUserItems().subscribe({
      next:(data) => {
        this.items = data.filter(datum => datum.onAuction === false );
      },
      error: (err) => {
        this.toastService.error('Could not fetch data')
        console.error(err);
      }
    })
  }

  revealItemForm(){
    this.showItemForm = true;
  }

  hideAllForms() {
    this.showItemForm = false;
    this.showAuctionForm = false;
    window.location.reload();
  }

  setSavedItem(item:Item){
    this.savedItem = item;
    this.showItemForm = false;
    this.showAuctionForm = !this.showItemForm;
  }
}
