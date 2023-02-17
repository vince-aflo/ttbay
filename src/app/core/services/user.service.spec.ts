import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {
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
          saveResult = value
        }
      });
    });

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedSaveResponse);
    controller.verify();

    expect(saveResult).toEqual(expectedSaveResponse);
  })

});
