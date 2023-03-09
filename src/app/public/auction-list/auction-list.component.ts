import { Component, Input } from '@angular/core';
import { Auction } from 'src/app/core/models/auction';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.scss']
})
export class AuctionListComponent {
  @Input() title?:string;
  @Input() auctions?: Auction[]
}
