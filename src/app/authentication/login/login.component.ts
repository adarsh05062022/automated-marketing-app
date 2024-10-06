import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service'; // Import your AuthService
import { ToastrService } from 'ngx-toastr'; // Import Toastr for notifications

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected this line
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loadingSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingSpinner = true;

    const userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Call login service method passing userData
    this.authService.login(userData).subscribe(
      (response) => {
        this.authService.setSession(response); // Store token and user data in cookies
        this.toastr.success('Login successful', '', { timeOut: 2000 });
        
        // Redirect based on user role
        if (this.authService.isOwner()) {
          this.router.navigate(['/dashboard/owner']); // Navigate to Owner dashboard
        } else {
          this.router.navigate(['/dashboard/agent']); // Navigate to Agent dashboard
        }
      },
      (error) => {
        this.toastr.error('Login failed', 'Invalid email or password', { timeOut: 2000 });
        this.loadingSpinner = false;
      }
    );
  }
}
