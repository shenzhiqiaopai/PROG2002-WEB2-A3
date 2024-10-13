import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // Call the backend GET API to get all active fundraisers
    fetch("http://localhost:3060/api/active") 
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok ");//If the request fails, an error is thrown.
        }
        return response.json();//If successful, the response data will be parsed into JSON format
    })
    .then(data => {
        const dataDiv:any = document.getElementById('data'); // Get the div with id 'data'
        dataDiv.innerHTML = ""; // Clear the existing content

        //Check whether the returned data has records
        if (data.length > 0) {
        data.forEach((fundraiser:any) => {
            //Create a new <div> element for each donation record and give it a CSS class name of fundraiser-card
            const fundraiserDiv = document.createElement("div");
            fundraiserDiv.className = "fundraiser-card";

            // Add all fundraiser fields
            fundraiserDiv.innerHTML = `
                <h3>${fundraiser.CAPTION}</h3>
                <p><strong>ID:</strong> ${fundraiser.FUNDRAISER_ID}</p>
                <p><strong>Organiser:</strong> ${fundraiser.ORGANIZER}</p>
                <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING} AUD</p>
                <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING} AUD</p>
                <p><strong>City:</strong> ${fundraiser.CITY}</p>
                <p><strong>Category:</strong> ${fundraiser.category_name}</p>
                <p><strong>Status:</strong> ${fundraiser.ACTIVE ? "Active" : "Suspended"}</p>
            `;
            //Add the constructed fundraiserDiv to dataDiv so that each fundraising record will be displayed on the web page.
            dataDiv.appendChild(fundraiserDiv);
        });
        } else {
            //If the returned data length is 0, it means there is no fundraising activity.
            dataDiv.textContent = "No active fundraisers";
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        let dom:any = document.getElementById('data');
        dom.textContent = "Failed to load data";
    });
  }
}
