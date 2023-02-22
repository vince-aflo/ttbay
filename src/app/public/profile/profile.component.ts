import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from 'src/app/core/services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  usernameNotTaken:boolean = true;

  ngOnInit(): void {
    //initialize form
    this.profileForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{5,}')]), //custom validator to check usernameTaken is false
      fullName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z -]*')]),
      email: new FormControl(''),
      profileUrl: new FormControl(null),
      officeLocation: new FormControl(null, Validators.required),
      officeDays: new FormArray([], Validators.required)
    })

    //set email
    this.oidcSecurityService.checkAuth().subscribe(({ userData }) => {
      this.profileForm.patchValue({
        email: userData.email
      })
    })

    //fill profile form with data from backend
    this.userService.getProfile(this.profileForm.get('email')!.value).then(data => {
      data.subscribe(response => {
        this.profileForm.patchValue({
          username: response.username,
          fullName: response.fullName,
          profileUrl: response.profileUrl,
          officeLocation: response.officeLocation,
        })

        //fill chosen days field with data from backend
        const chosenDays = response.officeDays.map(e => e.weekday);
        chosenDays.forEach((element) => {
          (<FormArray>this.profileForm.get('officeDays')).push(new FormControl(element));
        })
      })
    })

    //set check on username field
    this.profileForm.get('username')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe( response => (this.checkUsernameAvailability(this.profileForm.get('username')!.value)))
  }

  constructor(public oidcSecurityService: OidcSecurityService,
    private router: Router, private userService: UserService) {}

  //preview for new selected profile picture TODO: Setup Amazon bucket to upload images
  // showPreview(event: any) {
  //   if (event.target.files.length > 0) {
  //     let src = URL.createObjectURL(event.target.files[0]);
  //     let preview: any = document.getElementById("img-preview");
  //     preview.src = src;
  //   } else {
  //     console.debug('No file selected')
  //   }
  // }

  saveProfile(form:FormGroup) {
    if (form.valid && this.usernameNotTaken) {
      this.userService.saveProfile(form.value).then(data => {
        data.subscribe({
          next:(response) => {
            response.ok ? this.router.navigateByUrl('/home') : alert('something went wrong!')
          }
        })
      })
    } else {
      console.error('Invalid form')
      // notify with toast message that form is invalid
    }
  }

  checkUsernameAvailability(username:string){
      this.userService.checkUsernameAvailability(username)
      .subscribe({
        next:(data) => {
          this.usernameNotTaken = false;
        },
        error:(err) => {
          this.usernameNotTaken = true;
        }
      })
  }
  
  //toggle adds or removes day from profile form
  toggleDaySelection(element:HTMLInputElement){
    if(element.checked) {
      (<FormArray>this.profileForm.get('officeDays')).push(new FormControl(element.value))
    } else {

      const daysList = this.profileForm.get('officeDays')!.value;
      const indexToDelete = daysList.indexOf(element.value);

      (<FormArray>this.profileForm.get('officeDays')).removeAt(indexToDelete);
    }

  }
}
