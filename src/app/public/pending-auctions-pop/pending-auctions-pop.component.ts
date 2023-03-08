import { Component } from '@angular/core';
import {Router } from '@angular/router';
import {DeleteAccountModalComponent} from '../delete-account-modal/delete-account-modal.component'
@Component({
  selector: 'app-pending-auctions-pop',
  templateUrl: './pending-auctions-pop.component.html',
  styleUrls: ['./pending-auctions-pop.component.scss']
})
export class PendingAuctionsPopComponent {

  constructor(private route : Router, private deleteAccountModal : DeleteAccountModalComponent){};

  routeToAuctionsPAge(){
    this.route.navigateByUrl('auction');
  }

}
