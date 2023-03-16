import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent {
  dropdownOpen = false;
  selectedOption = 'Filter';
  options = [
    { label: 'Live', icon: 'https://icons.veryicon.com/png/o/business/business-style-icon/light-bulb-11.png' },
    { label: 'Closed', icon: 'https://www.svgrepo.com/download/12120/lightbulb-black-shape.svg' },
    { label: 'Scheduled', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnSoQf_vkO5V1zkHztyGvhPyhKjwV5U4z2A1f8O5Y5AOThEZ-dbpJGgqykFwUwU3rzyE&usqp=CAU' }
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option :any) {
    this.selectedOption = option.label;
    this.dropdownOpen = false;
    
    // logic
  }
  closeDropdown(){
   this.dropdownOpen= false;
  }

}
