
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { Item } from '../models/item.model';

fdescribe('ItemService', () => {
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
    const expectedResponse = new Item (
      1, 'Java for dummies', 
      [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
      'This is a good book', false, false
    );

    const expectedUrl = 'http://localhost:8080/api/v1/items/add'
    let result!:Item
    service.addItem({name: 'Java for dummies'}).subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
  })

  it('should get Categories', () => {
    const expectedResponse = {id: 1, name: 'BOOKS'};
    const expectedUrl = 'http://localhost:8080/api/v1/categories/all'
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

  it ("should get an item", ()=>{
    const expectedResponse = new Item (
      1, 'Java for dummies', 
      [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
      'This is a good book', false, false
    );

    const expectedUrl = `http://localhost:8080/api/v1/items/${expectedResponse.itemId}`

    let result!:Item;
    service.getItem(1).subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)

  })

  it ("should get user items", () => {
    const expectedResponse = [new Item (
      1, 'Java for dummies', 
      [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
      'This is a good book', false, false
    )];

    const expectedUrl = 'http://localhost:8080/api/v1/items/all-by-user'

    let result!:Item[];

    service.getAllUserItems().subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
    
  })

  it ("should get all user items on auction", () => {
    const expectedResponse = [
      new Item (
        1, 'Java for dummies', 
        [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
        'This is a good book', false, false
      )
    ]
    
    const expectedUrl = 'http://localhost:8080/api/v1/items/on-auction'

    let result!:Item[];

    service.getAllUserItemsOnAuction().subscribe({
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
