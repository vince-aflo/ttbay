import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBidsPopComponent } from './pending-bids-pop.component';

describe('PendingBidsPopComponent', () => {
  let component: PendingBidsPopComponent;
  let fixture: ComponentFixture<PendingBidsPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingBidsPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingBidsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
