import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(public oidcSecurityService: OidcSecurityService, private router: Router) {}
  
  ngOnInit(): void {

  }


  logout() {
    console.log('start logoff');
    this.oidcSecurityService.logoffAndRevokeTokens()
        .subscribe((result) => console.log(result));

    this.oidcSecurityService.logoffLocal();
    this.router.navigateByUrl('/login');
  }
}
