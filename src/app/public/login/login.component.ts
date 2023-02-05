import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService} from 'angular-auth-oidc-client';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuthenticated = false;
  isLoading:boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService, 
    private router: Router,
    private loginService: LoginService){

  }
  ngOnInit(): void {
    this.oidcSecurityService.checkAuth()
    .subscribe(({ isAuthenticated }) => {
      if (isAuthenticated) {
        //
        this.isLoading = true;

        this.loginService.login()
          .then((data) => {
            data.subscribe({
              next: (value) => {
                const {hasFilledUserProfile}:any = value;
                if (!hasFilledUserProfile) {
                  this.router.navigateByUrl('/home');
                } else {
                  this.router.navigateByUrl('/profile');
                }
              }
            });
          })   
        }
    })
  }
  

  login() {
    console.log('start login');
    this.oidcSecurityService.authorize();
  }

  refreshSession() {
    console.log('start refreshSession');
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}
