/**
 * This is my routing file
 * Author: Qiao Kang
 */
import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component'; // Import the Admin component

export const routes: Routes = [
  { path: 'admin', component: AdminComponent }, // Set up the admin route
  { path: '', redirectTo: '/admin', pathMatch: 'full' } // Redirect to admin by default
];