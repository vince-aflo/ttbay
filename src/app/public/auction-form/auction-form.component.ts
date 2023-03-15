import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss']
})
export class AuctionFormComponent implements OnInit {
  auctionForm!:FormGroup;
  @Input() itemToAuction!:Item
  @Output() setToFalse: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router:Router, private auctionService: AuctionService){}

  ngOnInit(): void {
    this.auctionForm = new FormGroup({
      itemId: new FormControl(this.itemToAuction.id, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    })
  }

  sendHideEvent(){
    this.setToFalse.emit(false);
  }

  scheduleAuction(){
    if(this.auctionForm.valid){
      this.auctionService.createAuction(this.auctionForm.value)
      .subscribe({
        next:(value) => {
          this.sendHideEvent()
          this.router.navigateByUrl('/sell')
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
