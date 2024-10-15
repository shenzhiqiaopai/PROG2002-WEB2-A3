import { Component } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';
import { Fundraiser } from 'src/app/fundraiser';

@Component({
  selector: 'app-search-fundraisers',
  templateUrl: './search-fundraisers.component.html',
  styleUrls: ['./search-fundraisers.component.css']
})
export class SearchFundraisersComponent {
  constructor(private dataService: DataserviceService){}
  fundraisers: Fundraiser[] = [];
  //This function gets the search criteria entered by the user from the form.
  searchFundraisers() {
    let organizerEl:any = document.getElementById('organizer');
    let captionEl:any = document.getElementById('caption');
    let targetFundingEl:any = document.getElementById('target_funding');
    let currentFundingEl:any = document.getElementById('current_funding');
    let cityEl:any = document.getElementById('city');
    let categoryEl:any = document.getElementById('category');
    //Getting User Input
    const organizer:string = organizerEl.value;
    const caption = captionEl.value;
    const targetFunding = targetFundingEl.value;
    const currentFunding = currentFundingEl.value;
    const city = cityEl.value;
    const category = categoryEl.value;

    // Make sure at least one condition is selected
    if (!organizer && !caption && !targetFunding && !currentFunding && !city && !category) {
      alert('Please select at least one criteria.');
      return;
    }
    
    this.dataService.searchFundraiser(organizer,caption,targetFunding,currentFunding,city,category).subscribe(fundraisers=>{
      this.fundraisers = fundraisers;
    })
  }

  //This function resets the search form and clears search results and error messages.
  clearCheckboxes() {
    let searchDom:any = document.getElementById('search-form');
    let resDom:any = document.getElementById('results');
    let errMsgDom:any = document.getElementById('error-message');
    searchDom.reset();
    resDom.innerHTML = '';
    errMsgDom.textContent = '';
  
  }
}
