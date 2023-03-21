import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAuctionCardComponent } from './live-auction-card.component';

describe('LiveAuctionCardComponent', () => {
  let component: LiveAuctionCardComponent;
  let fixture: ComponentFixture<LiveAuctionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveAuctionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveAuctionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
