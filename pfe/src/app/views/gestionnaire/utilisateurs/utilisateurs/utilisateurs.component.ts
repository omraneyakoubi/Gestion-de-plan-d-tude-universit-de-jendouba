import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  dataarray: User[] = [];
  gestionnaires: User[] = [];
  etudiants: User[] = [];
  enseignants: User[] = [];
  autres: User[] = [];
  userToDelete!: number; // Variable to store the user id to be deleted

  constructor(private userService: UserService ,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        if (response.status === 1 && Array.isArray(response.data)) {
          this.dataarray = response.data;

          // Filter users based on their roles
          this.gestionnaires = this.dataarray.filter(user => user.role === 'gestionnaire');
          this.etudiants = this.dataarray.filter(user => user.role === 'etudiant');
          this.enseignants = this.dataarray.filter(user => user.role === 'enseignant');
          this.autres = this.dataarray.filter(user => user.role !== 'gestionnaire' && user.role !== 'etudiant' && user.role !== 'enseignant');

          console.log("Gestionnaires:", this.gestionnaires);
          console.log("Etudiants:", this.etudiants);
          console.log("Enseignants:", this.enseignants);
          console.log("Autres:", this.autres);
        } else {
          console.error("Error: Invalid response format");
        }
      },
      (error: any) => {
        console.error("Error fetching users:", error);
      }
    );
  }

  openConfirmationModal(userId: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      timer: 5000, // Timer in milliseconds (5 seconds)
      timerProgressBar: true, // Enable timer progress bar
      willClose: () => {
        // Handle timeout, if needed
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
        // Navigate here after deletion
        window.location.reload();
      }
    });
  }
  
  deleteUser(userId: number) {
    if (userId) {
      // Delete user by ID
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          // Remove the deleted user from the UI
          this.dataarray = this.dataarray.filter(user => user.id !== userId);
          Swal.fire('Deleted!', 'User has been deleted.', 'success');

        },
        (error) => {
          console.error('Error deleting user:', error);
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        }
      );
    }
  }
}
