import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service'; // Adjust the path accordingly
import { Router } from '@angular/router';
@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent {
  isSidebarVisible: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.loginService.logout(); // Call logout method from LoginService
    // Redirect to login page or any other page after logout
    this.router.navigate(['/login']); // Assuming '/login' is the login page route
  }
}
