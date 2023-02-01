import { Component } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private loginService: LoginService){

  }

  login(){
    this.loginService.login().subscribe({
      next: (data) => console.log(data),
      complete:() => console.log('Observer got a complete notification')
    })
  }
}
