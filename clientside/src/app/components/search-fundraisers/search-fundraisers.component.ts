import { Component } from '@angular/core';

@Component({
  selector: 'app-search-fundraisers',
  templateUrl: './search-fundraisers.component.html',
  styleUrls: ['./search-fundraisers.component.css']
})
export class SearchFundraisersComponent {
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.



  }

  //This function gets the search criteria entered by the user from the form.
  searchFundraisers() {
    let organizerEl:any = document.getElementById('organizer');
    let captionEl:any = document.getElementById('caption');
    let targetFundingEl:any = document.getElementById('target_funding');
    let currentFundingEl:any = document.getElementById('current_funding');
    let cityEl:any = document.getElementById('city');
    let categoryEl:any = document.getElementById('category');
    //Getting User Input
    const organizer = organizerEl.value;
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

    //Create a new URLSearchParams object for building a query string.
    const queryParams = new URLSearchParams();
    //Use the append method to add valid conditions entered by the user to the query parameters.
    if (organizer) queryParams.append('organizer', organizer);
    if (caption) queryParams.append('caption', caption);
    if (targetFunding) queryParams.append('target_funding', targetFunding);
    if (currentFunding) queryParams.append('current_funding', currentFunding);
    if (city) queryParams.append('city', city);
    if (category) queryParams.append('category_name', category);
    let msgEl:any = document.getElementById('error-message');
    fetch(`http://localhost:3060/api/search?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv:any = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (data.length > 0) {
          data.forEach((fundraiser:any) => {
            const fundraiserLink = document.createElement('a');
            fundraiserLink.href = `http://localhost:8080/fundraiser?id=${fundraiser.FUNDRAISER_ID}`; // create a link for each project that points to the fundraising project's detailed information page.
            fundraiserLink.textContent = `Organizer: ${fundraiser.ORGANIZER}, Caption: ${fundraiser.CAPTION}, City: ${fundraiser.CITY}, Target Funding: ${fundraiser.TARGET_FUNDING}, Current Funding: ${fundraiser.CURRENT_FUNDING}, Category: ${fundraiser.category_name}`;

            const br = document.createElement('br');
            resultsDiv.appendChild(fundraiserLink);
            resultsDiv.appendChild(br);
          });
        } else {
          msgEl.textContent = 'No fundraisers found.';
        }
      })
      .catch(error => {
        console.error('Error fetching fundraisers:', error);
        msgEl.textContent = 'Failed to fetch data';
      });
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
