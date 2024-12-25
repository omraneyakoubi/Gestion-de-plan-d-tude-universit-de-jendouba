import { Component, OnInit } from '@angular/core';
import { Calanderier, CalanderierService } from 'src/app/services/calanderier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calanderier',
  templateUrl: './calanderier.component.html',
  styleUrls: ['./calanderier.component.css']
})
export class CalanderierComponent implements OnInit {
  calanderier: Calanderier[] = [];
  examan: Calanderier[] = [];
  ds: Calanderier[] = [];

  constructor(private calanderierService: CalanderierService) { }

  ngOnInit(): void {
    this.calanderierService.getAllCalanderier().subscribe(
      (response: any) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          this.calanderier = response.data;
          this.examan = this.calanderier.filter(item => item.typeexam === 'EXAMAN');
          this.ds = this.calanderier.filter(item => item.typeexam === 'DS');
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteEvent(id: number): void {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your service method to delete the event
        this.calanderierService.deleteCalendarEvent(id).subscribe(
          () => {
            console.log('Event deleted successfully');
            // Remove the event from the UI
            this.calanderier = this.calanderier.filter(item => item.id !== id);
            this.examan = this.examan.filter(item => item.id !== id);
            this.ds = this.ds.filter(item => item.id !== id);
            // Show success message
            this.showAlert();
          },
          (error) => {
            console.error('Error deleting event:', error);
            // Show error message
            Swal.fire('Error', 'Failed to delete event', 'error');
          }
        );
      }
    });
  }

  showAlert() {
    Swal.fire({
      title: 'Success!',
      text: 'Event has been deleted successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
