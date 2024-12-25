import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calanderier, CalanderierService } from 'src/app/services/calanderier.service';

@Component({
  selector: 'app-updatecall',
  templateUrl: './updatecall.component.html',
  styleUrls: ['./updatecall.component.css']
})
export class UpdatecallComponent implements OnInit {
  calanderier: Calanderier = {
    id: '',
    nomprenom: '',
    email: '',
    dateexam: '',
    salle: '',
    nomexam: '',
    typeexam: '',
    role: '',
    groupe: '',
  };

  constructor(
    private calanderierService: CalanderierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      console.log("ID:", id); // Check if ID is received correctly
      this.getCalanderierById(id);
    });
  }


  getCalanderierById(id: any): void {
    this.calanderierService.getCalanderierById(id).subscribe(
      (response: any) => {
        console.log("Response:", response);

        if (response !== null && response !== undefined && typeof response === 'object') {
          this.calanderier = response;
        } else {
          console.error('Error: Invalid response format or data not found');
          this.calanderier = {} as Calanderier; // Reset calanderier to an empty object
        }
      },
      error => {
        console.error('Error fetching calendar event:', error);
        this.calanderier = {} as Calanderier; // Reset calanderier to an empty object
      }
    );
}






  updateCalanderier(): void {
    if (this.calanderier && this.calanderier.id) {
      this.calanderierService.updateCalanderier(this.calanderier.id, this.calanderier).subscribe(
        (response: any) => {
          if (response.status === 1) {
            console.log('Calendar event updated successfully');
            this.router.navigate(['/admin/reunion']);
          } else {
            console.log('Calendar event updated successfully');
            this.router.navigate(['/gestionnaire/calanderier']);          }
        },
        error => {
          console.error('Error updating calendar event:', error);
        }
      );
    } else {
      console.error('No calendar event to update');
    }
  }
}
