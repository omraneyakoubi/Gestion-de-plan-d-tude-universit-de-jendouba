import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Groupe, GroupeService } from 'src/app/services/groupe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addgroupe',
  templateUrl: './addgroupe.component.html',
  styleUrls: ['./addgroupe.component.css']
})
export class AddgroupeComponent implements OnInit {
  groupe: Groupe = {
    id:'',
    nomprenom: '',
    email: '',
    specialite: '',
    nbgroupe: '',
  };

  constructor(private groupeService: GroupeService, private router: Router) { }

  ngOnInit(): void {
  }

  addgroupe(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      // If validation succeeds, proceed to add the group
      this.groupeService.addGroupe(this.groupe)
        .subscribe(
          response => {
            console.log('Group added successfully:', response);
            this.showSuccessAlert('Group added successfully');
            this.router.navigate(['/gestionnaire/groupe']);
          },
          error => {
            console.error('Error adding group:', error);
            this.showErrorAlert('Error adding group');
          }
        );
    } else {
      // If validation fails, show error alert with the list of validation errors
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    // Check if any required fields are empty
    if (!this.groupe.nomprenom) {
      errors.push('Nom et Prénom is required');
    }
    if (!this.groupe.email) {
      errors.push('Email is required');
    }
    if (!this.groupe.specialite) {
      errors.push('Specialite is required');
    }
    if (!this.groupe.nbgroupe) {
      errors.push('Nombre de groupes is required');
    }

    return errors;
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
}
