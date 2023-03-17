import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component'
import {RedirectComponent} from './redirect/redirect.component'
import { SellingComponent } from './selling/selling.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'redirect', component: RedirectComponent},
  {path: 'sell', component: SellingComponent, children: [
    {path: '', redirectTo: 'auctions', pathMatch: "full"},
    {path: 'auctions', component: AuctionListComponent},
    {path: 'drafts', component: ItemListComponent}
  ]},
  {path: 'item-detail/:id', component: ItemDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
