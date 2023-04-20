import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of, throwError } from 'rxjs';
import {UserService} from '../../core/services/user.service'
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const mockReturnValue = 'token'
  let oidcSpy = jasmine.createSpyObj('OidcSecurityService', ['checkAuth'])
  oidcSpy.checkAuth.and.returnValue(of(mockReturnValue));

  const userDataMockReslt:Promise<Observable<string>> = new Promise((resolve, reject) => resolve(of('John Doe')));
  const saveProfileResponse:Promise<Observable<string>> = new Promise((resolve, reject) => resolve(of('success')));
  const usernameCheckResult = 'available'

  let userServiceSpy = jasmine.createSpyObj('UserService', ['saveProfile', 'getProfile', 'checkUsernameAvailability'])
  userServiceSpy.getProfile.and.returnValue(userDataMockReslt);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: OidcSecurityService, useValue:oidcSpy}, 
        {provide: UserService, useValue:userServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save if form is valid', () => {
    userServiceSpy.saveProfile.and.returnValue(saveProfileResponse);

    let profileForm = new FormGroup({
      username: new FormControl('johnd', [Validators.required, Validators.pattern('[a-zA-Z0-9]{5,}')]), //custom validator to check usernameTaken is false
      fullName: new FormControl('John Doe', [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z -]*')]),
      email: new FormControl('johnd@turntabl.io'),
      profileUrl: new FormControl('https://google.com/johndimage.png'),
      officeLocation: new FormControl('SONNIDOM_HOUSE', Validators.required),
      officeDays: new FormArray([new FormControl('MONDAY')], Validators.required)
    })

    component.usernameNotTaken = true;

    component.saveProfile(profileForm);
    fixture.detectChanges()

    expect(userServiceSpy.saveProfile).toHaveBeenCalledWith(profileForm.value)
  })
  
  xit('should log an error if form is invalid', () => {
    userServiceSpy.saveProfile.and.returnValue(saveProfileResponse);

    let profileForm = new FormGroup({
      username: new FormControl('john', [Validators.required, Validators.pattern('[a-zA-Z0-9]{5,}')]), //custom validator to check usernameTaken is false
      fullName: new FormControl('John Doe', [Validators.required, Validators.pattern('[a-zA-Z]+[a-zA-Z -]*')]),
      email: new FormControl('johnd@turntabl.io'),
      profileUrl: new FormControl('https://google.com/johndimage.png'),
      officeLocation: new FormControl('SONNIDOM_HOUSE', Validators.required),
      officeDays: new FormArray([new FormControl('MONDAY')], Validators.required)
    })

    component.usernameNotTaken = true;

    component.saveProfile(profileForm);
    fixture.detectChanges()

    expect(userServiceSpy.saveProfile).toHaveBeenCalledTimes(0)
  })

  it('should check if username is already taken', () => {
    userServiceSpy.checkUsernameAvailability.and.returnValue(of(usernameCheckResult));

    const username = 'johnd';

    component.checkUsernameAvailability(username);
    fixture.detectChanges()

    expect(userServiceSpy.checkUsernameAvailability).toHaveBeenCalled()
    expect(component.usernameNotTaken).toBe(false);
  })

  it('should respond with an error if username is taken', () => {
    userServiceSpy.checkUsernameAvailability.and.returnValue(throwError(() => {new Error('unavailable')}));

    const username = 'johnd';

    component.checkUsernameAvailability(username);
    fixture.detectChanges()

    expect(component.usernameNotTaken).toBe(true);
  })
});
