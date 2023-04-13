import { compilePipeFromMetadata } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { of } from 'rxjs';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';
import { ItemService } from 'src/app/core/services/item.service';
import { CategoryNamePipe } from 'src/app/public/pipes/category-name.pipe';

import { ItemFormComponent } from './item-form.component';

describe('ItemFormComponent', () => {
  const imageUploadSpy = jasmine.createSpyObj('ImageUploadService', ['generateFilename', 'uploadImage'])
  const itemServiceSpy = jasmine.createSpyObj('ItemService', ['getCategories', 'addItem'])
  itemServiceSpy.getCategories.and.returnValue(of(['BOOKS', 'ELECTRONICS']))
  const toastSpy = jasmine.createSpyObj('ToastService', ['error'])

  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormComponent, CategoryNamePipe ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: ImageUploadService, useValue: imageUploadSpy},
        {provide: ItemService, useValue: itemServiceSpy},
        {provide: ToastService, useValue: toastSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false with empty fields in form', () => {
    const isValid = component.validateForm();
    expect(isValid).toBeFalse()
  })

  it('should return true with valid form fields', () => {
    component.itemForm.patchValue({
      name: 'Angular for Dummies',
      category: 'BOOKS',
      condition: 'NEW',
      description: 'This field has to be at least 50 characters long to ensure that the description is sufficient asdflkas dfa asdlfkajsdfasf asdfalskdfjasdf'
    })

    const data = [
      {id: 1, imageUrl: 'https://dummy.jpg'}, 
      {id: 2, imageUrl: 'https://dummy1.jpg'},
      {id: 3, imageUrl: 'https://dummy2.jpg'},
      {id: 4, imageUrl: 'https://dummy3.jpg'}
    ];
    
    data.forEach((e) => (<FormArray>component.itemForm.get('imageList')).push(new FormControl(e)));

    component.images = ['image1', 'image2', 'image3'];

    fixture.detectChanges()
    console.log(component.itemForm)

    const isValid = component.validateForm();
    expect(isValid).toBeTrue()
  })

  it('should send hide event to parent', () => {
    component.sendHideEvent();

    expect(component.setToFalse.closed).toBeFalse()
  })

  it('should cancel the process', () => {
    component.cancelProcess();

    expect(component.cancel.closed).toBeFalse()
  })

  it('should load images', () => {
    component.loadImages({target: {files: ['image1', 'image2']}})

    expect(component.images.length).toBeGreaterThan(0)
  })

  it('should save item', async () => {

  })
});
