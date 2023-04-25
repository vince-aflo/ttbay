import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient, 
    private oidcSecurityService: OidcSecurityService,
    private router:Router) { }

  async login() {
    const token = await firstValueFrom(this.oidcSecurityService.getIdToken());
    sessionStorage.setItem('id_token', token);
    return this.http.get(`${this.baseUrl}${ApiPaths.Login}`);
  }

  logout() {
    sessionStorage.removeItem('id_token');
    this.oidcSecurityService.logoffLocal();
    this.router.navigateByUrl('/login');
  }
}
