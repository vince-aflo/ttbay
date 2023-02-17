import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    NavbarComponent,
    SearchbarComponent,
    ButtonComponent,
    FooterComponent
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
