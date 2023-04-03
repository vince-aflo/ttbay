import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { Auction } from 'src/app/core/models/auction.model';
import { Item } from 'src/app/core/models/item.model';
import { AuctionService } from 'src/app/core/services/auction.service';

@Component({
  selector: 'app-edit-auction-form',
  templateUrl: './edit-auction-form.component.html',
  styleUrls: ['./edit-auction-form.component.scss']
})
export class EditAuctionFormComponent {
  editAuctionForm!:FormGroup;
  @Input() auctionToEdit!:Auction
  @Output() setToFalse: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private auctionService: AuctionService,
    private toastService: ToastService){}


  ngOnInit(): void {
    this.editAuctionForm = new FormGroup({
      auctionId: new FormControl(this.auctionToEdit.auctionId, [Validators.required]),
      reservedPrice: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*(\.[0-9]{0,2})?')]),
      endDate: new FormControl(null, [Validators.required, dateValidator()]),
    })
  }

  sendHideEvent(){
    this.setToFalse.emit(false);
  }

  setEndDate(event:any){
    const days = event.target.value
    const result = new Date(this.auctionToEdit.endDate)
    result.setDate(result.getDate() + parseInt(days))
    const dateString = result.toISOString().slice(0, result.toISOString().lastIndexOf(':'))
    this.editAuctionForm.get('endDate')!.patchValue(dateString)
    //set or patch the auctionForm
  }


  editAuction(){
    console.log(this.editAuctionForm.value)
    if(this.editAuctionForm.get('reservedPrice')?.valid || this.editAuctionForm.get('endDate')?.valid){
      this.auctionService.updateAuction(this.editAuctionForm.value)
      .subscribe({
        next:(value) => {
          this.sendHideEvent()
          window.location.reload()
        },
        error: (err) => {
          this.toastService.error(err.error)
          console.log(err)
        }
      })
    } else {
      this.toastService.error('At least one field must be filled')
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
