import { Auction } from "./auction.model";

export class User {
    email: string;
    username: string;
    fullName: string;
    profileUrl: string;
    officeLocation: string;
    officeDays: string[];
    auctions: Auction[]

    constructor (
        email: string,
        username:string,
        fullName: string,
        profileUrl: string,
        officeLocation: string,
        officeDays: string[],
        auctions: Auction[]
    ){
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.profileUrl = profileUrl;
        this.officeLocation = officeLocation;
        this.officeDays = officeDays;
        this.auctions = auctions;
    }
}