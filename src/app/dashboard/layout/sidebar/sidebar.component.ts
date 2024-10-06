import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isAdmin: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private router: Router,private authService:AuthService) {}


   /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties
   * of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
   */
  ngOnInit(): void {
    // this.performAction();
    this.isAdmin = this.authService.isOwner();
  }


   /**
   * Performs an action based on the user's authentication status and role.
   */
  performAction() {
    const userString = localStorage.getItem('USER_DATA');
    let userDetails = null;

    if (userString) {
      try {
        userDetails = JSON.parse(userString);

        if (userDetails.user.isAdmin) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Handle parsing error, if necessary

        this.router.navigate(['/auth/login']);
      }
    }
  }
}
