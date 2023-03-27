import { Component, Input, OnInit } from '@angular/core';
import {Item} from '../../core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';
import { copyFileSync } from 'fs';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items:Item[] = [];

  constructor(private itemService: ItemService,
    private toastService: ToastService){}

  ngOnInit(): void {
    this.itemService.getAllUserItems().subscribe({
      next:(data) => {
        console.log(data)
        this.items = data.filter(datum => datum.onAuction === false );
      },
      error: (err) => {
        this.toastService.error('Could not fetch data')
        console.error(err);
      }
    })

  }
}
