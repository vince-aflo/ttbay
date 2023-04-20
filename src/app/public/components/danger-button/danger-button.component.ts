import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent {
  @Input() buttonText!:string
  @Input() disableButton:boolean = false;
}
