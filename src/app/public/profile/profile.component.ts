import { Profile } from 'src/app/core/models/profile.model';
import { FormsModule, NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent {
  profile!:Profile;

  constructor(public oidcSecurityService: OidcSecurityService, private router: Router, private userService: UserService){
    this.profile = new Profile('', '', '', '', '', []);
    this.profile.email = history.state.email;
    this.profile.profileUrl = 'http://default.pro';
  }

  showPreview(event:any) {
    if(event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview:any = document.getElementById("img-preview");
      preview.src = src;
    }
  }

  saveProfile(formDetails: any){
    if (formDetails.value.mon == true){
      this.profile.officeDays.push('MONDAY');
    }
    
    if (formDetails.value.tue == true) {
      this.profile.officeDays.push('TUESDAY');
    }

    if (formDetails.value.wed == true) {
      this.profile.officeDays.push('WEDNESDAY');
    } 
    
    if (formDetails.value.thu == true) {
      this.profile.officeDays.push('THURSDAY');
    } 

    if (formDetails.value.fri == true) {
      this.profile.officeDays.push('FRIDAY');
    }

    console.log(this.profile);

    this.userService.saveProfile(this.profile).then((data) => {
      data.subscribe({
        next:(value) => {
          console.log('save response', value);
        }
      })
      this.router.navigateByUrl('/home');
    })

  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoffAndRevokeTokens()
        .subscribe((result) => console.log(result));

    this.oidcSecurityService.logoffLocal();
    this.router.navigateByUrl('/login');
  }
}
