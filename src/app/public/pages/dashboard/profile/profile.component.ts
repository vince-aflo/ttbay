import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from 'src/app/core/services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  usernameNotTaken:boolean = true;

  constructor(public oidcSecurityService: OidcSecurityService,
    private router: Router, private userService: UserService,
    private toastService: ToastService) {}

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
      data.subscribe({
        next: (response) => {
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
        },
        error:(err) => {
          this.toastService.error('Could not get profile information');
          console.error(err);
        }
      })
    }).catch((err) => {
      this.toastService.error('Could not ger profile information')
      console.error(err);
    })

    //set check on username field
    this.profileForm.get('username')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe({
        next:(response) => {
          this.checkUsernameAvailability(this.profileForm.get('username')!.value)
        }, 
        error:(err) => {
          this.toastService.error('Failed to check username availability')
          console.error(err)
        }
      })
  }

  saveProfile(form:FormGroup) {
    if (form.valid && this.usernameNotTaken) {
      this.userService.saveProfile(form.value).then(data => {
        data.subscribe({
          next:(response) => {
            response.ok ? this.router.navigateByUrl('/home') : this.toastService.error('Something went wrong')
          },
          error: (err) => {
            this.toastService.error('Could not save profile')
            console.error(err)
          }
        })
      }).catch((err) => {
        this.toastService.error(err.message)
        console.error(err)
      })
    } else {
      this.toastService.error('Invalid form')
      console.error('Invalid form')
    }
  }

  checkUsernameAvailability(username:string){
      this.userService.checkUsernameAvailability(username)
      .subscribe({
        next:(data) => {
          this.usernameNotTaken = true;
        },
        error:(err) => {
          this.usernameNotTaken = false;
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
