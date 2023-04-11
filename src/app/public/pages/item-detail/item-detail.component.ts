import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Item } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item!:Item;
  currentImagePosition:number = 0
  showAuctionForm:boolean = false;

  constructor(private itemService: ItemService,
    private router:Router,
    private toastService: ToastService){}

  ngOnInit(): void {
    const routeInfo = this.router.url.split('/');
    const id = parseInt(routeInfo[routeInfo.length - 1])
    this.itemService.getItem(id).subscribe({
      next:(data) => {
        this.item = data;
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
    if(this.currentImagePosition < this.item.imageList.length - 1) this.currentImagePosition++
  }
}
