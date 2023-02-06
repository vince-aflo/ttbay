export class Profile {
    email: string;
    username: string;
    fullName: string;
    profileUrl: string;
    officeLocation: string;
    officeDays: string[];

    constructor(email:string, username:string, fullName:string, profileUrl:string, officeLocation:string, officeDays:string[] ){
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.profileUrl = profileUrl;
        this.officeLocation = officeLocation;
        this.officeDays = officeDays;
    }

}