import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'automated-marketing-app';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUser();
      if (user.isOwner) {
        this.router.navigate(['/dashboard/owner']);
      } else {
        this.router.navigate(['/dashboard/agent']);
      }
    }
  }
}
