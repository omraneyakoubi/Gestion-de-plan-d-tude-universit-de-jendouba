import { Component } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (success: any) => {
        if (success) {
          console.log('Login successful');
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });

          // Navigate based on user's role
          const role = localStorage.getItem('role');
          if (role === 'gestionnaire') {
            this.router.navigate(['/gestionnaire']);
          } else if (role === 'etudiant') {
            this.router.navigate(['/etudiant']);
          } else if (role === 'enseignant') {
            this.router.navigate(['/enseignant']);
          }
        } else {
          console.error('Login failed');
          this.snackBar.open('Login failed', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Login service error:', error);
        this.snackBar.open('An error occurred during login', 'Close', { duration: 3000 });
      }
    );
  }
}
