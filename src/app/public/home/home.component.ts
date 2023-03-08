import { Component } from '@angular/core';
import {ItemService} from '../../core/services/item.service';
import {Item} from '../../core/models/item.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  liveAuctions?: Item[];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    // Get live items from the ItemService
    this.itemService.getLiveAuctions().subscribe((items: Item[]) => {
      // Assign the items to the liveAuction's array
      this.liveAuctions = items;
      
    });
}
}
