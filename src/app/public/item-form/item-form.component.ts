import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { Item } from 'src/app/core/models/item.model';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';
import { ItemService } from 'src/app/core/services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  images:any[] = []
  categories!:string[]
  itemForm!:FormGroup;
  invalidForm:boolean = false;

  isSaving:boolean = false;

  @Output() savedItemComplete: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() setToFalse: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private imageUploadService: ImageUploadService,
    private itemService: ItemService,
    private toastService: ToastService){

  }
  ngOnInit(): void {
    this.itemForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 .]{5,}')]),
      category: new FormControl(null, [Validators.required]),
      condition: new FormControl(null, [Validators.required]),
      imageList: new FormArray([], [Validators.required, this.minLengthArray(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(50)])
    })

    this.itemService.getCategories().subscribe({
      next: (data) => {
        this.categories = Object.values(data);
      },
      error: (err) => {
        this.toastService.error('Could not fetch categories')
        console.error(err)
      }
    })
  }

  //custom validator for imageURLs
  minLengthArray(min:number){
    return (control: AbstractControl): any => {
      if (control.value.length >= min) {
        return null
      } else {
        return {MinLengthArray: true}
      }
    }
  }

  sendHideEvent(){
    this.setToFalse.emit(false);
  }

  cancelProcess() {
    // this.imageUploadService.generateFilename();
    this.cancel.emit(false);
  }

  async saveItem(){
    //display loading animation
    this.isSaving = true;

    if (this.validateForm()) {
      //upload images, TODO: this feature should be moved to the backend for better security.
      const setURLs = () => {
        return this.images.map((e) => this.imageUploadService.uploadImage(e).then((data) => {
          (<FormArray>this.itemForm.get('imageList')).push(new FormControl({imageUrl: data}));
          return data;
        }))
      } 
                                        
      Promise.all(setURLs()).then((values) => {
        // console.log('promise.all values: ', values)
        this.itemService.addItem(this.itemForm.value).subscribe(response => {
          if (response) {
            this.savedItemComplete.emit(response);
          } else {
            this.toastService.error("Something went wrong. Please try again!")
          }
        })
      }).then(() => {
        this.isSaving = false;
        this.sendHideEvent()
      })
    } else {
      this.toastService.error("Invalid form");
      this.isSaving = false;
      this.invalidForm = true;
      setTimeout(() => {
        this.invalidForm = false;
      }, 2000)
    }

  }

  loadImages(event:any){
    if (event.target.files.length > 0){
      this.images = Object.values(event.target.files)
    }
  }

  validateForm():boolean{
    return this.itemForm.get('name')!.valid && 
    this.itemForm.get('category')!.valid &&
    this.itemForm.get('description')!.valid &&
    this.itemForm.get('condition')!.valid &&
    this.images.length > 2
  }
}
