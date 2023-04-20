import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  showModal = false;

  openModal(){
    this.showModal = true;
    
  }
  closeModal(){
    this.showModal = false;
  }
}
