import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  generateFilename():string{
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < 32){
      result += chars.charAt(Math.floor(Math.random() * chars.length))
      counter += 1;
    }
    return result;
  }

  getUploadURL(file:any){
    //generates filename and return uploadURL
    let fileExtension:string = file.name.split('.')[1];

    let queryParams = {
      "objectKey": `${this.generateFilename()}.` + fileExtension,
      "contentType": 'multipart/form-data'
    }

    return this.http.get('http://localhost:8080/api/v1/upload-url', {params: queryParams, observe: 'response', responseType: 'text'})
  }

  async uploadImage(file:any){
    const result = await firstValueFrom(this.getUploadURL(file));

    if (result.body) {
        this.http.put(result.body, file, {headers: {'Content-Type': 'multipart/form-data'}, observe: 'response'})
          .subscribe(response => { console.log(response.ok)})
        // console.log(result.body);
        return result.body?.split('?')[0];
    } else {
      return null;
    }
  }
}
