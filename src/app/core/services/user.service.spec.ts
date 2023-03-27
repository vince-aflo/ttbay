import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { Profile } from '../models/profile.model';

import { UserService } from './user.service';

fdescribe('UserService', () => {
  const mockReturnValue = 'token'
  const oidcSpy = jasmine.createSpyObj('OidcSecurityService', ['getIdToken'])
  oidcSpy.getIdToken.and.returnValue(of(mockReturnValue));
  const requestBody = {name: 'John Doe', username: 'johnd'};
  const expectedUrl = 'http://localhost:8080/api/v1/profile'
  const expectedSaveResponse = 'success';

  let service: UserService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserService, {provide: OidcSecurityService, useValue:oidcSpy}]
    });

    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save profile', async () => {
    let saveResult:any | undefined;
    await service.saveProfile(requestBody).then((response) => {
      response.subscribe({
        next:(value) => {
          saveResult = value.body
        }
      });
    });

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedSaveResponse);
    controller.verify();

    expect(saveResult).toEqual(expectedSaveResponse);
  })

  it('should get profile', async () => {
    const expectedResponse = new Profile(
      'johndoe@gmail.com',
      'johndoe',
      'John Doe',
      'https://dummy.com',
      'SONNIDOM_HOUSE',
      [{id: 1, weekday: 'MONDAY'}, {id: 2, weekday: 'TUESDAY'}],
      'USER'
    )

    let profile:Profile | undefined;
    await service.getProfile('johndoe@gmail.com').then((response) => {
      response.subscribe({
        next:(value) => {
          profile = value;
        }
      })
    })

    const request = controller.expectOne(expectedUrl+'/johndoe@gmail.com');
    request.flush(expectedResponse);
    controller.verify();

    expect(profile).toEqual(expectedResponse)
  })

  it('should check username availabiltity', () => {
    const expectedResponse = 'available';
    let result:string | null = '';
    service.checkUsernameAvailability('johndoe').subscribe({
      next:(value) => {
        result = value.body;
      }
    })

    const request = controller.expectOne(expectedUrl+'/username/johndoe')
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
  })

  it('should delete account',() => {
    const expectedResponse :string | null= 'sucessfully';

    let result:any | null;
    service.deleteAccount("at@gmail.com").subscribe({
      next:(value) => {
        result = value.body;
      }
    })


    const expectedUrl = 'http://localhost:8080/api/v1/account/user/at@gmail.com'
    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResponse)
    controller.verify()

    expect(result).toEqual(expectedResponse)
  })


});
