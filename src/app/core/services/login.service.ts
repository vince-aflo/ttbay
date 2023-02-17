import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService{
  token!: string;

  constructor(private http:HttpClient, private oidcSecurityService: OidcSecurityService) { 

  }

  async login(){
    // console.log('login service called the backend server');
    this.token = await firstValueFrom(this.oidcSecurityService.getIdToken());
    // console.log('token', this.token);
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }
    return this.http.get('http://localhost:8080/api/v1/register', header);
  }

  logout(){
    return this.oidcSecurityService.logoffLocal();
  }
}
