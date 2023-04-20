import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  categories:string[] = ['Books', 'Computers', 'Consumer Electronics', 'Everything else']


  dropdownOpen = false;
  selectedIcon = "https://img.icons8.com/ios-filled/256/diversity.png";
  options = [
    { label: 'Electronics', icon: 'https://img.icons8.com/ios-filled/256/electronics.png' },
    { label: 'Books', icon: "https://img.icons8.com/ios-filled/256/books.png" },
    { label: 'Fashion', icon: 'https://img.icons8.com/ios-filled/256/hanger.png' }, 
    { label: 'Sporting', icon: 'https://img.icons8.com/ios-filled/256/trophy.png' },
    { label: 'Home & Garden', icon: 'https://img.icons8.com/ios-filled/256/house-with-a-garden.png' },
    { label: 'All', icon: 'https://img.icons8.com/ios-filled/256/diversity.png' },

  ];

  selectOption(option :any) {
    this.selectedIcon = option.icon;
    this.dropdownOpen = false;
  }

  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  closeDropdown(){
   this.dropdownOpen= false;
  }
}
