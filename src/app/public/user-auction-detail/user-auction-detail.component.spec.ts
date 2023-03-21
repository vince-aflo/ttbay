import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuctionDetailComponent } from './user-auction-detail.component';

describe('UserAuctionDetailComponent', () => {
  let component: UserAuctionDetailComponent;
  let fixture: ComponentFixture<UserAuctionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuctionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuctionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
