import { Profile } from 'src/app/core/models/profile.model';
import { FormsModule, NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent {
  profile!:Profile;

  constructor(public oidcSecurityService: OidcSecurityService, private router: Router){
    this.profile = new Profile('', '', '', '', '', [])
  }

  showPreview(event:any) {
    if(event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview:any = document.getElementById("img-preview");
      preview.src = src;
      console.log(this.profile);
    }
  }

  saveProfile(formDetails: any){}

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoffAndRevokeTokens()
        .subscribe((result) => console.log(result));

    this.oidcSecurityService.logoffLocal();
    this.router.navigateByUrl('/login');
  }
}
