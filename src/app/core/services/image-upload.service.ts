import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  getUploadURL(file:any){
    //generates filename and return uploadURL
    let fileExtension:string = file.name.split('.')[1];

    let queryParams = {
      "objectKey": `${uuid()}.` + fileExtension,
      "contentType": 'multipart/form-data'
    }

    return this.http.get('http://localhost:8080/api/v1/upload-url', {params: queryParams, observe: 'response', responseType: 'text'})
  }

  async uploadImage(file:any){
    const result = await firstValueFrom(this.getUploadURL(file));
    
    const uploadResult = await firstValueFrom(this.http.put(result.body!, file, {headers: {'Content-Type': 'multipart/form-data'}, observe: 'response'}))
    
    return uploadResult ? result.body?.split('?')[0] : null

  }
}
