import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ImageUploadService } from './image-upload.service';

fdescribe('ImageUploadService', () => {
  let service: ImageUploadService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [ImageUploadService,]
    });
    service = TestBed.inject(ImageUploadService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //mock service functionality and test
  xit('should get upload URL', () => {
    let file:any = {name: 'image.png'}
    let result:string | null = '';

    const expectedResponse = 'https://ttbay/image';
    const expectedUrl = 'http://localhost:8080/api/v1/upload-url'

    service.getUploadURL(file).subscribe({
      next:(value) => {
        result = value.body;
      }
    })

    const request = controller.match(expectedUrl)
    console.log(request);

    // expect(request).toEqual(expectedResponse)
    request[0].flush({ success: true})
  })

  xit('should upload image file', async () => {
    let file:any = {name: 'image.png'};

  })
});
