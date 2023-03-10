import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingComponent } from './selling.component';

describe('AuctionComponent', () => {
  let component: SellingComponent;
  let fixture: ComponentFixture<SellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
