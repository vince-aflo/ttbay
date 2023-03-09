import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { DeleteAccountModalComponent } from './delete-account-modal/delete-account-modal.component'; 
import { HttpClientModule } from "@angular/common/http";
import { RedirectComponent } from './redirect/redirect.component';
import { PendingAuctionsPopComponent } from './pending-auctions-pop/pending-auctions-pop.component';
import { AuctionComponent } from './auction/auction.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { AuctionFormComponent } from './auction-form/auction-form.component';
import { CategoryNamePipe } from './pipes/category-name.pipe';


import { ItemCardComponent } from './item-card/item-card.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { AuctionCardComponent } from './auction-card/auction-card.component';

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
    FooterComponent,
    AccountSettingsComponent,
    DeleteAccountModalComponent,
    RedirectComponent,
    AuctionComponent,
    ItemFormComponent,
    AuctionFormComponent,
    CategoryNamePipe,
    PendingAuctionsPopComponent,
    AuctionComponent,
    ItemCardComponent,
    ItemListComponent,
    AuctionListComponent,
    AuctionCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PublicRoutingModule,
    FormsModule,
    AngularToastifyModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class PublicModule { }
