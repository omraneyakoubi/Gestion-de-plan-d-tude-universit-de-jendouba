import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupeService, Groupe } from 'src/app/services/groupe.service';
import Swal from 'sweetalert2'; // Import Swal

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  groupes: Groupe[] = [];
  userToDelete: number | undefined;

  constructor(private groupeService: GroupeService, private router: Router) { }

  ngOnInit(): void {
    this.loadGroupes();
  }

  loadGroupes(): void {
    this.groupeService.getAllGroupes().subscribe(
      (response: any) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          this.groupes = response.data;
          console.log("groupesbbbb", this.groupes);
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteGroupe(id: number): void {
    if (id) {
      this.userToDelete = id;
      // Show confirmation modal using SweetAlert
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this group?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmDelete();
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      this.groupeService.deletegroupe(this.userToDelete).subscribe(
        () => {
          console.log('Groupe deleted successfully');
          this.groupes = this.groupes.filter(g => g.id !== this.userToDelete); // Remove from UI
          Swal.fire('Deleted!', 'Group has been deleted.', 'success');
        },
        (error) => {
          console.error('Error deleting groupe:', error);
          Swal.fire('Error', 'Failed to delete group', 'error');
        }
      );
    }
  }

  viewGroupeDetails(id: number): void {
    // Implement view group details functionality
  }

  editGroupe(id: number): void {
    // Implement edit group functionality
  }
}
