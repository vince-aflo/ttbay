import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';
import { environment } from '../environments/environment';
import { ApiPaths } from '../enums/api-paths';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  async saveProfile(body: any) { 
    return this.http.put<any>(`${this.baseUrl}${ApiPaths.GetProfile}`, body, {observe: 'response', responseType: 'json'});
  }

  async getProfile(path:string) {
    return this.http.get<Profile>(`${this.baseUrl}${ApiPaths.GetProfile}/${path}`);
  }

  checkUsernameAvailability(path:string) {
    return this.http.get(`${this.baseUrl}${ApiPaths.CheckUsernameAvailability}/${path}`, {observe: 'response', responseType: 'text'});
  }

  deleteAccount(email:string) {
    return this.http.delete(`${this.baseUrl}${ApiPaths.DeleteAccount}/${email}`, { observe: 'response', responseType: 'json'});
  }
}
