import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('renders a navbar component', () => {
    const { debugElement } = fixture;
    const navbar = debugElement.query(By.css('app-navbar'))
    expect(navbar).toBeTruthy();
  })

  it('renders a searchbar component', () => {
    const { debugElement } = fixture;
    const searchbar = debugElement.query(By.css('app-searchbar'))
    expect(searchbar).toBeTruthy();
  })

  it('renders a footer component', () => {
    const { debugElement } = fixture;
    const footer = debugElement.query(By.css('app-footer'))
    expect(footer).toBeTruthy();
  })

});
