import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService{
  constructor(private http:HttpClient, private oidcSecurityService: OidcSecurityService) { 

  }

  async login(){
    const token = await firstValueFrom(this.oidcSecurityService.getIdToken());

    sessionStorage.setItem('id_token', token)

    return this.http.get('http://localhost:8080/api/v1/register');
  }

  logout(){
    sessionStorage.removeItem('id_token');
    return this.oidcSecurityService.logoffLocal();
  }
}
