import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: '',
    cin: '',
    id: 0
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // This method can remain empty if not used for now.
  }

  signUp() {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.userService.addUser(this.user).subscribe(
        (response: any) => {
          console.log("User added successfully:", response);
          this.showSuccessAlert('User added successfully');
          this.sendmail(this.user.email, this.user.password); // Call sendmail with email and password
          this.resetForm();
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error("Error adding user:", error);
          this.showErrorAlert('Error adding user');
        }
      );
      
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    // CIN validation
    if (!this.user.cin || !/^\d{8}$/.test(this.user.cin)) {
      errors.push('CIN must be 8 digits');
    }
    
    // Nom validation
    if (!this.user.nom) {
      errors.push('Nom is required');
    }
    
    // Prenom validation
    if (!this.user.prenom) {
      errors.push('Prenom is required');
    }
    
    // Email validation
    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      errors.push('Valid email is required');
    }
    
    // Password validation
    if (!this.user.password || !this.isValidPassword(this.user.password)) {
      errors.push('Password must contain at least one letter and one number');
    }
  
    return errors;
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidPassword(password: string): boolean {
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /\d/.test(password);
    return containsLetter && containsNumber;
  }

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  resetForm() {
    this.user = {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      cin: '',
      id: 0
    };
  }

  sendmail(email: string, password: string) {
    let reqObj = {
      email: this.user.email,
      mdp: this.user.password
    };
    console.log("Sendmail request:", reqObj);
  
    this.userService.sendMail(reqObj).subscribe(
      (data: any) => {
        console.log("Email sent successfully:", data);
      },
      (error: any) => {
        console.error("Error sending email:", error);
      }
    );
  }
  

}
