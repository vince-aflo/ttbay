import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { PublicModule } from './public/public.module';
=======
import { AuthConfigModule } from './core/auth/auth-config.module';
>>>>>>> feature/ttBay-19-login-page


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    PublicRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
    PublicModule
=======
    AuthConfigModule
>>>>>>> feature/ttBay-19-login-page
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
