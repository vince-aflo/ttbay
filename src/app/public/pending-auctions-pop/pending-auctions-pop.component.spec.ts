import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAuctionsPopComponent } from './pending-auctions-pop.component';

describe('PendingAuctionsPopComponent', () => {
  let component: PendingAuctionsPopComponent;
  let fixture: ComponentFixture<PendingAuctionsPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingAuctionsPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingAuctionsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
