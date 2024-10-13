
/**
 * This is the component TS file of the management website. Most of the methods needed for the management side are here
 * author:Qiao Kang
 */

import { Component } from '@angular/core';
// This is a service provided by Angular's HttpClientModule. It allows making HTTP requests to external APIs or servers, enabling features such as getting, posting, updating, and deleting data from the server.
import { HttpClient } from '@angular/common/http';
// It allows me to use ngModel, form validation, and other form handling related functionality in my templates.
import { FormsModule } from '@angular/forms';
// This module contains commonly used directives like ngIf, ngFor, and other basic functionality of Angular. It is required for any component that uses basic Angular directives.
import { CommonModule } from '@angular/common';
// It is used to access form controls, handle validation, and manage form submissions within the component.
import { NgForm } from '@angular/forms';
// Get data from an API or manage application state. This import indicates that the service will be used in the component for data-related operations.
import { DataService } from '../data.service';

// Import the Fundraiser interface to define the structure of a fundraiser object
interface Fundraiser {
  FUNDRAISER_ID: number; // Unique identifier for the fundraiser
  ORGANIZER: string; // Name of the organizer
  CAPTION: string; // Caption or title of the fundraiser
  TARGET_FUNDING: number; // Target funding amount
  CURRENT_FUNDING: number; // Amount of funding currently collected
  CITY: string; // City where the fundraiser is located
  ACTIVE: boolean; // Status indicating if the fundraiser is active or inactive
  CATEGORY_ID: number; // Identifier for the category of the fundraiser
}

@Component({
  selector: 'app-admin', // Selector for the admin component
  standalone: true, // Indicates this is a standalone component
  templateUrl: './admin.component.html', // Path to the component's HTML template
  styleUrls: ['./admin.component.css'], // Path to the component's CSS styles
  imports: [FormsModule, CommonModule] // Import necessary Angular modules
})
export class AdminComponent {

  // Array to hold the list of fundraisers
  fundraisers: Fundraiser[] = [];

  // Object to hold the new fundraiser data
  newFundraiser: Fundraiser = { 
    FUNDRAISER_ID: 0, 
    ORGANIZER: '', 
    CAPTION: '', 
    TARGET_FUNDING: 0, 
    CURRENT_FUNDING: 0, 
    CITY: '', 
    ACTIVE: true, 
    CATEGORY_ID: 1 
  };

  // Variable to hold the ID of the fundraiser to update
  updateFundraiserId: number = 0;

  // Object to hold the details of the fundraiser to update
  upFundraiserDetail = {
    FUNDRAISER_ID: 0,   // Default ID is 0
    ORGANIZER: '',
    CAPTION: '',
    TARGET_FUNDING: 0,
    CURRENT_FUNDING: 0,
    CITY: '',
    ACTIVE: true,
    CATEGORY_ID: 1  // Default category is set to 1
  };

  // Constructor to inject HttpClient and fetch fundraisers when the component loads
  constructor(private http: HttpClient) {
    this.getFundraisers(); // Call to get the list of fundraisers
  }

  // Method to fetch the list of fundraisers from the server
  getFundraisers() {
    this.http.get<Fundraiser[]>('http://localhost:3060/api/fundraiser')
      .subscribe((data: Fundraiser[]) => {
        this.fundraisers = data; // Assign the fetched data to the fundraisers array
      });
  }

  // Method to add a new fundraiser
  addFundraiser(fundraiserForm: NgForm) {
    // Check if the form is valid
    if (fundraiserForm.invalid) {
      alert("Please fill in all required fields."); // Alert the user if the form is invalid
      return;
    }

    // Make a POST request to add the new fundraiser
    this.http.post('http://localhost:3060/api/fundraiser', {
      organizer: this.newFundraiser.ORGANIZER,
      caption: this.newFundraiser.CAPTION,
      targetFunding: this.newFundraiser.TARGET_FUNDING,
      currentFunding: this.newFundraiser.CURRENT_FUNDING,
      city: this.newFundraiser.CITY,
      active: this.newFundraiser.ACTIVE,
      categoryId: this.newFundraiser.CATEGORY_ID
    }) 
    .subscribe({
      next: () => {
        this.getFundraisers(); // Refresh the list of fundraisers
        // Reset the newFundraiser object to its initial state
        this.newFundraiser = { 
          FUNDRAISER_ID: 0, 
          ORGANIZER: '', 
          CAPTION: '', 
          TARGET_FUNDING: 0, 
          CURRENT_FUNDING: 0, 
          CITY: '', 
          ACTIVE: true, 
          CATEGORY_ID: 1 
        };
        fundraiserForm.resetForm(); // Reset the form
        alert("Fundraiser added successfully!"); // Alert user of success
      },
      error: (err) => {
        console.error("Error adding fundraiser:", err); // Log the error for debugging
        alert("Failed to add fundraiser. Please try again."); // Alert the user of the failure
      }
    });
  }

  // Method to update an existing fundraiser
  updateFundraiser() {
    const updateId = Number(this.updateFundraiserId); // Convert the ID to a number
    console.log("Update Fundraiser ID:", updateId); // Log the ID for debugging

    // Validate the ID before proceeding
    if (isNaN(updateId) || updateId <= 0) {
      alert("Please enter a valid Fundraiser ID."); // Alert if the ID is invalid
      return;
    }

    // Prepare the updated data
    const updatedData = {
      organizer: this.upFundraiserDetail.ORGANIZER, // Use lowercase property names for the API
      caption: this.upFundraiserDetail.CAPTION, 
      targetFunding: this.upFundraiserDetail.TARGET_FUNDING, 
      currentFunding: this.upFundraiserDetail.CURRENT_FUNDING, 
      city: this.upFundraiserDetail.CITY, 
      active: this.upFundraiserDetail.ACTIVE, 
      categoryId: this.upFundraiserDetail.CATEGORY_ID // Use lowercase property names for the API
    };

    console.log("Updated Data:", updatedData); // Log the updated data for debugging

    // Make a PUT request to update the fundraiser
    this.http.put(`http://localhost:3060/api/fundraiser/${updateId}`, updatedData)
      .subscribe({
        next: () => {
          this.getFundraisers(); // Refresh the list of fundraisers
          this.updateFundraiserId = 0; // Reset the update ID
          // Reset the update detail object to its initial state
          this.upFundraiserDetail = {
            FUNDRAISER_ID: 0,
            ORGANIZER: '',
            CAPTION: '',
            TARGET_FUNDING: 0,
            CURRENT_FUNDING: 0,
            CITY: '',
            ACTIVE: true,
            CATEGORY_ID: 1 // Default category
          };
          alert("Fundraiser updated successfully!"); // Alert user of success
        },
        error: (err) => {
          console.error("Error updating fundraiser:", err); // Log the error for debugging
          alert("Failed to update fundraiser. Please try again."); // Alert the user of the failure
        }
      });
  }

  // Method to delete a fundraiser
  deleteFundraiser(id: number) {
    this.http.delete(`http://localhost:3060/api/fundraiser/${id}`)
      .subscribe({
        next: () => {
          this.getFundraisers(); // Refresh the list of fundraisers
          alert("Fundraiser deleted successfully!"); // Alert user of success
        },
        error: (err) => {
          console.error("Error deleting fundraiser:", err); // Log the error for debugging
          alert("Failed to delete fundraiser. Tips: Only fundraisers with a current funding of 0 can be deleted."); // Alert the user of the failure
        }
      });
  }
}