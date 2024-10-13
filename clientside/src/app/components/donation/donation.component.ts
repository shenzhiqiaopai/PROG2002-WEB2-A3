import { Component } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
        let donationEl:any = document.getElementById('donationForm');
        donationEl.addEventListener('submit', function(event:any) {
            event.preventDefault(); // Prevent the default form submit

            let amountEl:any = document.getElementById('amount');
            let fundraiserEl:any = document.getElementById('fundraiserId');
            let giverEl:any = document.getElementById('giver');

            const amount = amountEl.value;
            const fundraiserId = fundraiserEl.value;
            const giver = giverEl.value;

            // Check if all fields are filled
            if (!amount || !fundraiserId || !giver) {
                alert('Please fill in all the required fields.');
                return;
            }

            // Get the current date and time
            const date = new Date().toISOString();

            // Create the data to be sent to the server
            const formData = {
                amount: parseFloat(amount),
                fundraiserId: parseInt(fundraiserId),
                giver: giver,
                date: date
            };

            // Send the data to the server using fetch
            fetch('http://localhost:3060/api/donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Handle the response data
                alert('Donation submitted successfully!');
            })
            .catch(error => {
                console.error('Error submitting donation:', error);
                alert('Failed to submit donation. Please try again.');
            });
        });
    });
  }
}
