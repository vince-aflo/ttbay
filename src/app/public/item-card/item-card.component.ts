import { Component, Input } from '@angular/core';
import { Auction } from 'src/app/core/models/auction';
import { Item } from '../../core/models/item.model';
import {ItemService} from '../../core/services/item.service'


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input()
  item!: Item;
  @Input() auction!:Auction;
  
  constructor(private itemService: ItemService) {}
  
}