import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
      price: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*(\.[0-9]{0,2})?')]),
      startDate: new FormControl(null, [Validators.required, dateValidator()]),
      endDate: new FormControl(null, [Validators.required, dateValidator()])
    })
  }

  sendHideEvent(){
    this.setToFalse.emit(false);
  }

  getMinDate(){
    const value = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"))
    return value
  }


  scheduleAuction(){
    // console.log(this.auctionForm)
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

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    return new Date(control.value).getTime() < today 
      ? {invalidDate: 'You cannot use past dates' } 
      : null;
  }
}