import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showPreview(event:any) {
    if(event.target.files.length > 0) {
      let src = URL.createObjectURL(event.target.files[0]);
      let preview:any = document.getElementById("img-preview");
      preview.src = src;
      console.log(event.target.files);
      console.log(preview);
    }
    // var src = URL.createObjectURL(event.target);
  }
}
