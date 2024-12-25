import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Diplome, DiplomeService } from 'src/app/services/diplome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adddiplome',
  templateUrl: './adddiplome.component.html',
  styleUrls: ['./adddiplome.component.css']
})
export class AdddiplomeComponent implements OnInit {

  diplomee: Diplome = {
    id:'',
    code: '',
    nomdiplome: '',
    niveau: '',
    niveauuniv: '',
  };

  niveaux: string[] = [];

  constructor(private diplomeService: DiplomeService, private router: Router) { }

  ngOnInit(): void {
    this.onNiveauChange(); // Call the function when component initializes
  }

  adddiplome(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      // If validation succeeds, proceed to add the diploma
      this.diplomeService.adddiplome(this.diplomee)
        .subscribe(
          response => {
            console.log('Diploma added successfully:', response);
            this.showSuccessAlert('Diploma added successfully');
            this.router.navigate(['/gestionnaire/diplome']);
          },
          error => {
            console.error('Error adding diploma:', error);
            this.showErrorAlert('Error adding diploma');
          }
        );
    } else {
      // If validation fails, show error alert with the list of validation errors
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  onNiveauChange() {
    this.niveaux = [];
    if (this.diplomee.niveau === 'Licence') {
      this.niveaux = ['1ere', '2eme', '3eme'];
    } else if (this.diplomee.niveau === 'Master') {
      this.niveaux = ['1ere', '2eme'];
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    // Check if any required fields are empty
    if (!this.diplomee.code) {
      errors.push('Code is required');
    }
    if (!this.diplomee.nomdiplome) {
      errors.push('Nom de diplome is required');
    }
    if (!this.diplomee.niveau) {
      errors.push('Niveau de diplome is required');
    }
    if (!this.diplomee.niveauuniv) {
      errors.push('Niveau universitaire is required');
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
