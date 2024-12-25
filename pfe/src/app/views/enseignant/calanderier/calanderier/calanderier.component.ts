import { Component, OnInit } from '@angular/core';
import { Calanderier, CalanderierService } from 'src/app/services/calanderier.service';
import Swal from 'sweetalert2';

declare var $: any; // Declare jQuery
@Component({
  selector: 'app-calanderier',
  templateUrl: './calanderier.component.html',
  styleUrls: ['./calanderier.component.css']
})
export class CalanderierComponent implements OnInit {
  calanderier: Calanderier[] = [];
  enseignantEvents: Calanderier[] = [];
  userToDelete: number | undefined;

  constructor(private calanderierService: CalanderierService) { }

  ngOnInit(): void {
    
    this.calanderierService.getAllCalanderier().subscribe(
      (response: any) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          this.calanderier = response.data;
          console.log("test", this.calanderier);

          // Filter the events for enseignant role
          this.enseignantEvents = this.calanderier.filter(item => item.role === 'enseignant');
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openConfirmationModal(id: number): void {
    this.userToDelete = id;
    $('#confirmDeleteModal').modal('show');
  }

  deleteEvent(): void {
    if (this.userToDelete) {
      // Implement deletion logic
      console.log('Delete event with ID:', this.userToDelete);
      // Call your service method to delete the event
      // Once deleted, remove the event from the UI
      this.calanderier = this.calanderier.filter(item => item.id !== this.userToDelete);
      this.enseignantEvents = this.enseignantEvents.filter(item => item.id !== this.userToDelete);
      $('#confirmDeleteModal').modal('hide'); // Hide confirmation modal after deletion
    }
  }
  showAlert() {
    Swal.fire({
      title: 'Salut!',
      text: 'Vous avez approuvé Supprimer cette Calanderier avec success !',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
