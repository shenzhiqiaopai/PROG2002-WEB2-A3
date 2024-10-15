import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DonationComponent } from './components/donation/donation.component';
import { FundraisersComponent } from './components/fundraisers/fundraisers.component';
import { SearchFundraisersComponent } from './components/search-fundraisers/search-fundraisers.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 重定向根路径到'/home'
  { path: 'home', component: HomeComponent },
  { path: 'donation/:id', component: DonationComponent },
  { path: 'fundraiser/:id', component: FundraisersComponent },
  { path: 'donation/:id', component: DonationComponent },
  { path: 'search-fundraisers', component: SearchFundraisersComponent },
  // 可以添加更多路由规则
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }