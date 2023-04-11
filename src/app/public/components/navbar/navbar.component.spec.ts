import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginComponent } from '../pages/login/login.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  const mockReturnValue = 'success'
  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['logout'])
  loginServiceSpy.logout.and.returnValue(of(mockReturnValue));
  let component: NavbarComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: 'login', component: LoginComponent}
      ])],
      declarations: [ NavbarComponent ],
      providers:[
        {provide: LoginService, useValue: loginServiceSpy},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showMenu boolean', () => {
    const menuIcon = debugElement.query(
      By.css('[data-testid="menuIcon"]')
    )
    
    const toggleValue = fixture.componentInstance.showMenu;

    menuIcon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(toggleValue).toBe(!fixture.componentInstance.showMenu)

  })

  it('should navigate to login page after logout', () => {
    const navigateSpy = spyOn(mockRouter, 'navigateByUrl');    
    component.logout()
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith('/login');
  })

});
