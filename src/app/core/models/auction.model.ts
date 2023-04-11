import { Item } from "./item.model";
import { User } from "./user.model";

export class Auction {
  auctionId: number;
  currentHighestBid: number | null;
  endDate: Date;
  reservedPrice: number;
  startDate: Date ;
  status: string;
  auctioneerEmail : string;
  item : Item;
  winner : User|null;

  constructor (
    auctionId: number, 
    currentHighestBid: number | null, 
    endDate: Date, 
    reservedPrice: number, 
    startDate: Date, 
    status: string, 
    auctioneerEmail : string, 
    item : Item, 
    winner: User | null
    ) {
    this.auctionId = auctionId;
    this.currentHighestBid = currentHighestBid;
    this.endDate = endDate;
    this.reservedPrice = reservedPrice;
    this.startDate = startDate;
    this.status = status;
    this.auctioneerEmail = auctioneerEmail;
    this.item = item;
    this.winner = winner;
  }
}
