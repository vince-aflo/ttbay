import { Item } from "./item.model";
import { User } from "./user.model";

export class Auction {
  auctionId: number;
  currentHighestBid: number | null;
  endDate: Date;
  reservedPrice: number;
  startDate: Date ;
  status: string;
  auctioner_email : string;
  item : Item ;
  winner : User | null;

  constructor (
    auctionId: number, 
    currentHighestBid: number | null, 
    endDate: Date, 
    reservedPrice: number, 
    startDate: Date, 
    status: string, 
    auctioner_email : string, 
    item : Item, 
    winner: User | null
    ) {
    this.auctionId = auctionId;
    this.currentHighestBid = currentHighestBid;
    this.endDate = endDate;
    this.reservedPrice = reservedPrice;
    this.startDate = startDate;
    this.status = status;
    this.auctioner_email = auctioner_email;
    this.item = item;
    this.winner = winner;
  }
}
