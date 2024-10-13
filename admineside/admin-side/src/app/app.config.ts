/**
 * It is used to replace the app.module.ts file. Because I am using Standalone Components.
 * Author:Qiao Kang
 */
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';// Import FormsModule to enable template-driven forms functionality in the application.
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule to enable HTTP communication with external APIs or servers.

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule, HttpClientModule) // Add FormsModule and HttpClientModule to the providers.
  ]
};
