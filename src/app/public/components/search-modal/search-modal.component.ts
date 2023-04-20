import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component'
@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent {

  constructor(private navbar : NavbarComponent){}

  showModal = false;

  openModal(){
    this.showModal = true;
    
  }

  closeModal(){
    this.navbar.closeSearchModal();
  }
}
