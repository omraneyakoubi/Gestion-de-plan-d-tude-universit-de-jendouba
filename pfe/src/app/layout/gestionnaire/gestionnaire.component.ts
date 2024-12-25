import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Adjust the path accordingly

@Component({
  selector: 'app-gestionnaire',
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.css']
})
export class GestionnaireComponent {
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
