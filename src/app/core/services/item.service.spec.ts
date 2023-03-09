<<<<<<< HEAD
=======
<<<<<<< HEAD
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
=======
>>>>>>> origin/develop
>>>>>>> origin/develop
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
<<<<<<< HEAD
=======
<<<<<<< HEAD
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ItemService]
    });

    service = TestBed.inject(ItemService);
    controller = TestBed.inject(HttpTestingController);
  
=======
>>>>>>> origin/develop

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
<<<<<<< HEAD
=======
>>>>>>> origin/develop
>>>>>>> origin/develop
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
<<<<<<< HEAD
=======
<<<<<<< HEAD

  it('should add an item', () => {
    const expectedResponse = 'success';
    const expectedUrl = 'http://localhost:8080/api/v1/items/add'
    let result:string | null = '';
    service.addItem({name: 'Java for dummies'}).subscribe({
      next:(value) => {
        result = value.body;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
  })

  it('should get Categories', () => {
    const expectedResponse = {id: 1, name: 'BOOKS'};
    const expectedUrl = 'http://localhost:8080/api/v1/category/categories'
    let result:any | null = '';
    service.getCategories().subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
  })
=======
>>>>>>> origin/develop
>>>>>>> origin/develop
});
