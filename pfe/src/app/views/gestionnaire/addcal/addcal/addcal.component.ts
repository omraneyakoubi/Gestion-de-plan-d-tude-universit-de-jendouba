import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calanderier, CalanderierService } from 'src/app/services/calanderier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcal',
  templateUrl: './addcal.component.html',
  styleUrls: ['./addcal.component.css']
})
export class AddcalComponent implements OnInit {
  calanderier: Calanderier = {
    id: '',
    nomprenom: '',
    email: '',
    dateexam: '',
    salle: '',
    nomexam: '',
    typeexam: '',
    role:'',
    groupe:'',
  };

  constructor(private calanderierService: CalanderierService, private router: Router) { }

  ngOnInit(): void {
  }

  addCalanderier(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      // If validation succeeds, proceed to add the calendar event
      this.calanderierService.addCalanderier(this.calanderier)
        .subscribe(
          response => {
            console.log('Calendar event added successfully:', response);
            this.showSuccessAlert('Calendar event added successfully');
            this.router.navigate(['/gestionnaire/calanderier']);
            this.sendmail();
          },
          error => {
            console.error('Error adding calendar event:', error);
            this.showErrorAlert('Error adding calendar event');
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
    if (!this.calanderier.nomprenom) {
      errors.push('Nom et Prénom is required');
    }
    if (!this.calanderier.email) {
      errors.push('Email is required');
    }
    if (!this.calanderier.dateexam) {
      errors.push('Date de l\'examen is required');
    }
    if (!this.calanderier.salle) {
      errors.push('Salle is required');
    }
    if (!this.calanderier.role) {
      errors.push('Role is required');
    }

    // Additional validation for role-specific fields
    if (this.calanderier.role === 'etudiant') {
      if (!this.calanderier.nomexam) {
        errors.push('Nom examen is required for role Etudiant');
      }
      if (!this.calanderier.groupe) {
        errors.push('Groupe is required for role Etudiant');
      }
      if (!this.calanderier.typeexam) {
        errors.push('Type de l\'examen is required for role Etudiant');
      }
    }
  
    return errors;
  }

  sendmail(): void {
    let reqObj = {
      email: this.calanderier.email,
      nomprenom: this.calanderier.nomprenom,
      nomexam:  this.calanderier.nomexam,
      typeexam: this.calanderier.typeexam,
      salle: this.calanderier.salle,
      dateexam: this.calanderier.dateexam,
    };

    console.log("Sendmail request:", reqObj);

    this.calanderierService.sendMail(reqObj).subscribe(
      (data: any) => {
        console.log("Email sent successfully:", data);
      },
      (error: any) => {
        console.error("Error sending email:", error);
      }
    );
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
