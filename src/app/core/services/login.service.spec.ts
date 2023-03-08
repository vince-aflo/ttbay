import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

describe('LoginService', () => {
  const mockReturnValue = 'token'
  const oidcSpy = jasmine.createSpyObj('OidcSecurityService', ['getIdToken', 'logoffLocal'])
  oidcSpy.getIdToken.and.returnValue(of(mockReturnValue));
  const expectedUrl = 'http://localhost:8080/api/v1/register';
  const expectedResult = {"message": "Already resgistered"}

  let service: LoginService;
  let controller:HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService, {provide: OidcSecurityService, useValue: oidcSpy}]
    });

    service = TestBed.inject(LoginService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login() function', async () => {
    let loginResult:any | undefined;
    await service.login().then((response) => {
      response.subscribe({
        next:(value) => {
          loginResult = value
        }
      });
    });

    const request = controller.expectOne(expectedUrl)
    request.flush(expectedResult);
    controller.verify();

    expect(loginResult).toEqual(expectedResult);
  })

  it('should call logout() function', () => {
    service.logout()

    expect(oidcSpy.logoffLocal).toHaveBeenCalled()
  })
});
