import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { UserService } from 'src/app/core/services/user.service';
import {AccountSettingsComponent} from '../account-settings/account-settings.component'
import {LoginService} from '../../core/services/login.service';
import { AuctionService } from 'src/app/core/services/auction.service';



@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})

export class DeleteAccountModalComponent {
  constructor( 
    private accountSettingsComponent : AccountSettingsComponent,
    private router: Router,
    private auctionService: AuctionService,
    private userService: UserService, 
    private _toastService: ToastService,
    private loginService: LoginService){}

  showModal = false;
  email_input: string = '';
  showEmptyFieldError = false;
  timerId: any;
  showPendingAuctionModal = false;

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

  checkForPendingAuctions(){
    //Check for live auctions 
    this.auctionService.getAllAuctionsByUser().subscribe({
      next:(value) => {
        if(value !== null){
          console.log
          this.showPendingAuctionModal= true;
        }
      }
    })
    
  }

  deleteAccount(){ 
    //CHECK FOR EMPTY FIELD 
    if (this.email_input === '') {
      this.showEmptyFieldError = true;
      
    }
    else{
      //CHECK FOR PENDING AUCTIONS 
       this.checkForPendingAuctions();

      //MAKE DELETE REQUEST 
      this.userService.deleteAccount(this.email_input).subscribe(response => {
          console.log(response.body);

          //DELETE SUCCESS TOAST
          if (response.status == 200) {
             this._toastService.success('Account deleted successfully');
             this.logoutAndRoute();
          } else if (response.status == 401) {
            this._toastService.error('Email does not match');
          } else if (response.status == 403) {
            this._toastService.error('Email does not match');
          } else {
            this._toastService.error('Process failed'); 
          }
      })
    } 
  }

  
 
  
   

  closeModal(){
    this.accountSettingsComponent.closeModal();
  }
}


