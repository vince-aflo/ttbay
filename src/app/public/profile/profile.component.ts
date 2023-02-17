import { Profile } from 'src/app/core/models/profile.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from 'src/app/core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent {
  profile!: Profile;
  email!: string;

  constructor(public oidcSecurityService: OidcSecurityService,
    private profileService: UserService,
    private router: Router, private userService: UserService) {
    this.profile = new Profile('', '', '', '', '', []);
    this.oidcSecurityService.checkAuth().subscribe(({ userData }) => {
      this.email = userData.email;
    })
    this.profile.email = this.email;
    this.profile.profileUrl = 'http://default.pro';

    this.userService.getProfile(this.email).then(data => {
      data.subscribe(response => {
        console.log(response.body);
      })
    })

  }

  showPreview(event: any) {
    if (event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview: any = document.getElementById("img-preview");
      preview.src = src;
    }
  }

  validateCheckboxes(value: any) {
    return (value.mon || value.tue || value.wed || value.thu || value.fri);
  }

  validateField(element: any): boolean {
    console.log(element.dirty, element.invalid);
    return element.dirty && element.invalid;
  }

  saveProfile(formDetails: any) {
    if (this.validateCheckboxes(formDetails.value) && formDetails.valid) {
      if (formDetails.value.mon == true) {
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

      // console.log(this.profile);

      this.userService.saveProfile(this.profile).then((data) => {
        data.subscribe(response => {
          console.log('response', response);
          console.log('data', data);
          if (response.ok) {
            this.router.navigateByUrl('/home');
          } else {
            alert('something went wrong!');
            //TODO: add toast to show error message
          }
        })

      })

    } else {
      console.log('form incomplete');
      //TODO: add toast to notify that something went wrong
    }
  }

}
