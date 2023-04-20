import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/dashboard/account-settings/account-settings.component'
import { RedirectComponent } from './pages/redirect/redirect.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { AuctionListComponent } from './pages/dashboard/auction-list/auction-list.component';
import { ItemListComponent } from './pages/dashboard/item-list/item-list.component';
import { UserAuctionDetailComponent } from './pages/user-auction-detail/user-auction-detail.component';
import { AuctionDetailComponent } from './pages/auction-detail/auction-detail.component';
import { BidListComponent } from './pages/dashboard/bid-list/bid-list.component';
import { CompletedAuctionDetailComponent } from './pages/completed-auction-detail/completed-auction-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'redirect', component: RedirectComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: '', redirectTo: 'auctions', pathMatch: "full"},
    {path: 'auctions', component: AuctionListComponent},
    {path: 'drafts', component: ItemListComponent},
    {path: 'bids', component: BidListComponent},
    {path: 'account-settings', component: AccountSettingsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'completed-auction-detail/:id', component:CompletedAuctionDetailComponent}
  ]},
  {path: 'item-detail/:id', component: ItemDetailComponent},
  {path: 'auction-detail/:id', component: UserAuctionDetailComponent},
  {path: 'live-auction-detail/:id', component: AuctionDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
