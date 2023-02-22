import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { UserService } from 'src/app/core/services/user.service';
import {AccountSettingsComponent} from '../account-settings/account-settings.component'
import {LoginService} from '../../core/services/login.service'

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})

export class DeleteAccountModalComponent {
  constructor( 
    private accountSettingsComponent : AccountSettingsComponent,
    private router: Router,
    private userService: UserService, 
    private _toastService: ToastService,
    private loginService: LoginService){}

  showModal = false;
  email_input: string = '';
  showEmptyFieldError = false;
  timerId: any;

  openModal(){
    this.showModal = true;
    
  }

  

  logoutAndRoute(){
    this.timerId = setTimeout(() => {
      // SIGN OUT
      this.loginService.logout();
      
      //REDIRECT
      this.router.navigateByUrl('redirect')
      }, 5000); // 5s
        
  }

  deleteAccount(){ 
  
    if (this.email_input === '') {
      this.showEmptyFieldError = true;
    }
    else{
      //MAKE DELETE REQUEST 
      this.userService.deleteAccount(this.email_input).then(data => {
        data.subscribe(
          response => {
             console.log(response.body);

             //DELETE SUCCESS TOAST
              if (response.status == 200){
                this._toastService.success('Account deleted successfully');
                this.logoutAndRoute();
                }
               }, 
           error =>{
               switch(error.status){ 
                  case 401: { 
                  this._toastService.error('Email does not match');
                  break; 
                } case 403: { 
                  this._toastService.error('Email does not match');
                  break; 
                }
                  default: { 
                    this._toastService.error('Process failed'); 
                    break; 
                }        
             }}
        );
      })
    } 
  }

  
 
  
   

  closeModal(){
    this.accountSettingsComponent.closeModal();
  }
}


