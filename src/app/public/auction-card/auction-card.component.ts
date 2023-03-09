import { Component, Input } from '@angular/core';
import { Auction } from 'src/app/core/models/auction';

@Component({
  selector: 'app-auction-card',
  templateUrl: './auction-card.component.html',
  styleUrls: ['./auction-card.component.scss']
})
export class AuctionCardComponent {
  @Input() auction!:Auction;
}
