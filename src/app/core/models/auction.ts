import { Item } from "./item.model";

export class Auction {
  id: number;
  current_highest_bid: number;
  endDate: Date;
  reservedPrice: number;
  startDate: Date;
  status: boolean;
  auctioner_email : string;
  item : Item;
  winner_email : string;

  constructor(id: number, current_highest_bid: number, endDate: Date, reservedPrice: number, startDate: Date,  status: boolean, auctioner_email : string,  item : Item, winner_email : string) {
    this.id = id;
    this.current_highest_bid = current_highest_bid;
    this.endDate = endDate;
    this.reservedPrice = reservedPrice;
    this.startDate = startDate;
    this.status = status;
    this.auctioner_email = auctioner_email;
    this.item = item;
    this.winner_email = winner_email;
  }

//   get remainingTime(): string {
//     const diff = this.endTime.getTime() - new Date().getTime();
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//     return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
//   }

}
