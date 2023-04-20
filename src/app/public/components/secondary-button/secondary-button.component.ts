import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent {
  @Input() buttonText!:string
  @Input() disableButton:boolean = false;
}
