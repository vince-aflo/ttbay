import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {
  constructor(private router:Router){}
  remainingTime!: number;

  ngOnInit() {
    // set the initial remaining time in seconds
    this.remainingTime = 7;
  
    // start the countdown timer
    setInterval(() => {
      // decrement the remaining time by 1 second
      this.remainingTime--;
  
      // check if the remaining time has reached 0
      if (this.remainingTime === -1) {
        // stop the countdown timer
       this.router.navigateByUrl('login');
      }
    }, 1000); // run the function every second (1000 milliseconds)
  }
  
}

