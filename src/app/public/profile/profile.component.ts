import { Component } from '@angular/core';
import { Profile } from 'src/app/core/models/profile.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  profile!:Profile;

  constructor(){
    this.profile = new Profile('', '', '', '', '', [])
  }

  showPreview(event:any) {
    if(event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview:any = document.getElementById("img-preview");
      preview.src = src;
      console.log(this.profile);
    }
  }

  saveProfile(formDetails: any){
    
  }
}
