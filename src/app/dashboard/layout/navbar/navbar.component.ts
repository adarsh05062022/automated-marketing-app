import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router,private authService:AuthService) {}

  ngOnInit(): void { 
    this.isLoggedIn = this.authService.isAuthenticated();
   }


  /**
   * The `logOutButtonClicked` function logs out the user and navigates to the login page.
   */
  logOutButtonClicked(){
    this.authService.logout();
    // this.router.navigate(['/auth/login']);

  }
}
