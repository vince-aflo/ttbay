import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auction-form',
  templateUrl: './auction-form.component.html',
  styleUrls: ['./auction-form.component.scss']
})
export class AuctionFormComponent implements OnInit {
  auctionForm!:FormGroup;

  @Output() setToFalse: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.auctionForm = new FormGroup({
      itemId: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    })
  }

  sendHideEvent(){
    this.setToFalse.emit(false);
  }

  scheduleAuction(){
    //TODO: call service to create auction
    this.sendHideEvent()
  }
}
