export class Profile {
    email: string;
    username: string;
    fullName: string;
    profileUrl: string;
    officeLocation: string;
    role?: string;
    officeDays: {id:number, weekday:string}[];

    constructor(email:string, username:string, fullName:string, profileUrl:string, officeLocation:string, officeDays:{id:number, weekday:string}[], role?:string ){
        this.email = email;
        this.username = username;
        this.fullName = fullName;
        this.profileUrl = profileUrl;
        this.officeLocation = officeLocation;
        this.officeDays = officeDays;
        this.role = role;
    }

}