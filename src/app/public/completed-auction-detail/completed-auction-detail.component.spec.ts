import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAuctionDetailComponent } from './completed-auction-detail.component';

describe('CompletedAuctionDetailComponent', () => {
  let component: CompletedAuctionDetailComponent;
  let fixture: ComponentFixture<CompletedAuctionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedAuctionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedAuctionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
