import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.getUser(); // Get the user from AuthService

    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']); // Redirect to login if not authenticated
      return false;
    }
  
    // Check if the expected role matches the user's role
    const expectedRole = next.data['role'];
    if (expectedRole !== undefined && expectedRole !== user.isOwner) {
      this.router.navigate(['/auth/login']); // Redirect to login if roles do not match
      return false;
    }
  
    return true; // Allow access if authenticated and roles match
  }
}
