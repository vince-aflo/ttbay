import { Component, Input, OnInit } from '@angular/core';
import {Item} from '../../core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items:Item[] = [];

  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    this.itemService.getAllUserItems().subscribe({
      next:(data) => {
        this.items = data;
      }
    })

  }
}
