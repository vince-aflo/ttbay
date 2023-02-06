import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
>>>>>>> feature/ttBay-19-login-page


@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    ProfileComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PublicRoutingModule,
    FormsModule
  ]
})
export class PublicModule { }
