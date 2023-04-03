import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { Auction } from '../models/auction.model';
import { Item } from '../models/item.model';
import { User } from '../models/user.model';
import { validate } from 'uuid';

fdescribe('AuctionService', () => {
  let service: AuctionService;

  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuctionService]
    });

    service = TestBed.inject(AuctionService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all auctions by user', () => {
    const expectedResponse = [
      new Auction(
        1, 
        0, 
        new Date(), 
        10, new Date(), 
        'DRAFT', 
        'h@h.com',
        new Item (
          1, 'Java for dummies', 
          [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
          'This is a good book', false, false
        ),
        null      
      )
    ]

    const expectedUrl = 'http://localhost:8080/api/v1/auctions/all-by-user'
    let result!:Auction[]
    service.getAllAuctionsByUser().subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)    
  })

  it("should create an auction", ()=>{
    const expectedResponse = 'success'
    const expectedUrl = 'http://localhost:8080/api/v1/auctions/add'
    
    let result:string | null = "";
    service.createAuction("").subscribe(response => {
      result = response.body;
      
    } )
    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)   
  })

  it('should get all auctions', () => {
    const expectedResponse = [
      new Auction(
        1, 
        0, 
        new Date(), 
        10, new Date(), 
        'DRAFT', 
        'h@h.com',
        new Item (
          1, 'Java for dummies', 
          [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
          'This is a good book', false, false
        ),
        null      
      )
    ]

    const expectedUrl = 'http://localhost:8080/api/v1/auctions/all'
    let result!:Auction[]
    service.getAllAuctions().subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)    
  })

  it('should get an auction by user', () => {
    const expectedResponse = 
      new Auction(
        1, 
        0, 
        new Date(), 
        10, new Date(), 
        'DRAFT', 
        'h@h.com',
        new Item (
          1, 'Java for dummies', 
          [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
          'This is a good book', false, false
        ),
        null      
      )
    

    const expectedUrl = `http://localhost:8080/api/v1/auctions/${expectedResponse.auctionId}`
    let result!:Auction
    service.getAuction(1).subscribe({
      next:(value) => {
        result = value;
      }
    })

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)    
  })

  it('should return an auction given the auctionId, and either price or duration', () => {
    const expectedResponse = new Auction(
      1, 
      0, 
      new Date(), 
      10, new Date(), 
      'DRAFT', 
      'h@h.com',
      new Item (
        1, 'Java for dummies', 
        [{id: 1, imageUrl: 'asdfsad.jpg'}], 'BOOKS', 'NEW', 
        'This is a good book', false, false
      ),
      null      
    )
    const expectedUrl = 'http://localhost:8080/api/v1/auctions'
    let result!:Auction
    service.updateAuction({auctionId: 1, reservedPrice: 200, endDate: null}).subscribe({
      next:(value) => {
        result = value
      }
    })
    
    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)

  })
});
