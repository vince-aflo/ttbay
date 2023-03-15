
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ItemService]
    });

    service = TestBed.inject(ItemService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
})
