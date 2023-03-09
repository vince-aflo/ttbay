import { Component, Input } from '@angular/core';
import {Item} from '../../core/models/item.model';
import { Auction} from '../../core/models/auction';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() title?: string;
  @Input() items?: Item[];
  @Input() auctions?: Auction[];

}
