import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuctionFormComponent } from './edit-auction-form.component';

describe('EditAuctionFormComponent', () => {
  let component: EditAuctionFormComponent;
  let fixture: ComponentFixture<EditAuctionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAuctionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAuctionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
