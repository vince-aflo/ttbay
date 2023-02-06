import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    ProfileComponent
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
