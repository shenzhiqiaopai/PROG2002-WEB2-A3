import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import { Fundraiser } from 'src/app/fundraiser';

@Component({
  selector: 'app-fundraisers',
  templateUrl: './fundraisers.component.html',
  styleUrls: ['./fundraisers.component.css']
})
export class FundraisersComponent implements OnInit {
  constructor(private dataService:DataserviceService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const fundraiserId = Number(params['id']);
      this.fetchFundraiserDetails(fundraiserId);
    });
  }

  // params = new URLSearchParams(window.location.search);
  // fundraiserId = Number(this.params.get('id'));

  fundraiser:Fundraiser= new Fundraiser(0, '', '', '', '', '', true, 0,'');
  // Extract the fundraiser ID from the query string
  


  //This function is used to obtain detailed information about the fundraising project.
   fetchFundraiserDetails(id:number) {
      // if (!this.fundraiserId) {
      //   let dom:any = document.getElementById('fundraiserDetails');
      //     dom.innerHTML = '<p>No fundraiser selected.</p>';
      //     return;
      // }

      // // Fetch the fundraiser details from the API using the fundraiser ID
      // fetch(`http://localhost:3060/api/${this.fundraiserId}`)
      //     .then(response => {
      //         if (!response.ok) {
      //             throw new Error('Network response was not ok');
      //         }
      //         return response.json();
      //     })
      //     .then(data => {
      //         if (data && data.length > 0) {
      //             this.displayFundraiserDetails(data[0]); // If data exists and the array length is greater than 0, call the displayFundraiserDetails function to display the detailed information of the obtained fundraising project.
      //         } else {
      //           let dom1:any = document.getElementById('fundraiserDetails');
      //             dom1.innerHTML = '<p>Fundraiser not found.</p>';
      //         }
      //     })
      //     .catch(error => {
      //         console.error('Error fetching fundraiser:', error);
      //         let dom:any = document.getElementById('fundraiserDetails');
      //         dom.innerHTML = '<p>Failed to load fundraiser details.</p>';
      //     });
    
    this.dataService.getFundraiserDetails(id).subscribe(fundraisers=>{
      console.log(fundraisers);
      console.log(id);
      this.fundraiser = fundraisers[0];
      // this.displayFundraiserDetails(this.fundraiser);

    })
      
  }


  //This function is used to display the detailed information of the fundraising project on the web page.
  //  displayFundraiserDetails(fundraiser:Fundraiser) {
  //   console.log(fundraiser);
  //     const detailsDiv:any = document.getElementById('fundraiserDetails');
  //     detailsDiv.innerHTML = `
  //         <h2>${fundraiser.CAPTION}</h2>
  //         <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
  //         <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING} AUD</p>
  //         <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING} AUD</p>
  //         <p><strong>City:</strong> ${fundraiser.CITY}</p>
  //         <p><strong>Category:</strong> ${fundraiser.Category_Name}</p>
  //         <p><strong>Status:</strong> ${fundraiser.ACTIVE ? 'Active' : 'Inactive'}</p>
  //     `;
  // }

  //This function is used to display the function after the donation button is clicked


  // Load fundraiser details when the page loads
  // window.onload = fetchFundraiserDetails;
}
