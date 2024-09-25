import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    
    
  ) {}

  ngOnInit(): void {  }


  /**
   * The `logOutButtonClicked` function logs out the user and navigates to the login page.
   */
  logOutButtonClicked(){

    this.router.navigate(['/auth/login']);

  }
}
