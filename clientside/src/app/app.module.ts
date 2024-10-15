import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonationComponent } from './components/donation/donation.component';
import { HomeComponent } from './components/home/home.component';
import { FundraisersComponent } from './components/fundraisers/fundraisers.component';
import { SearchFundraisersComponent } from './components/search-fundraisers/search-fundraisers.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonationComponent,
    FundraisersComponent,
    SearchFundraisersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
