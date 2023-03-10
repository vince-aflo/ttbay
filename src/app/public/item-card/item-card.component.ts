import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../core/models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input()
  item!: Item;

  constructor(private router:Router) {}
  
  showItemDetails(){
    console.log('item clicked')
    this.router.navigateByUrl(`/item-detail/${this.item.id}`)
  }
}