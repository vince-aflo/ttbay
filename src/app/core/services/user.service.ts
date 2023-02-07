import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token!:any

  constructor(private http:HttpClient, private oidcSecurityService: OidcSecurityService) { }

  async saveProfile(body: any) {
    this.token = await firstValueFrom(this.oidcSecurityService.getIdToken())
    // console.log('token', this.token);
    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }
    return this.http.put<any>('http://localhost:8080/api/v1/profile', body, header)
  }
}
