import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { 
  }

  async saveProfile(body: any) { 
    return this.http.put<any>('http://localhost:8080/api/v1/profile', body, {observe: 'response', responseType: 'json'})
  }

  async getProfile(path:string){
    return this.http.get<Profile>('http://localhost:8080/api/v1/profile/' + path)
  }

  checkUsernameAvailability(path:string){
    return this.http.get('http://localhost:8080/api/v1/profile/username/' + path, {observe: 'response', responseType: 'text'})
  }
}
