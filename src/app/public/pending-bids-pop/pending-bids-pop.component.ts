import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from '../../core/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-pending-bids-pop',
  templateUrl: './pending-bids-pop.component.html',
  styleUrls: ['./pending-bids-pop.component.scss']
})
export class PendingBidsPopComponent implements OnInit {
  @Input() itemId!:number
  @Output() showModal:EventEmitter<boolean> = new EventEmitter()

  constructor(private itemService: ItemService,  private router:Router, private toastService:ToastService){}
  
  ngOnInit(): void {
   
  }

  deleteItem(){
    // PendingBidsPopComponent
    console.log("i was called")
    // this.itemService.deleteItem(this.itemId).subscribe(
    //   {next:(value) => 
    //     {
    //       console.log(value)
    //       this.toastService.success("Item successfully deleted")
    //       this.router.navigateByUrl('/sell/auctions')
    //   }, 
    //   error : (error) => 
    //   {this.toastService.error("Could not delete item")
    // }})
  }

  cancel() {
    this.showModal.emit(false)
  }


}

