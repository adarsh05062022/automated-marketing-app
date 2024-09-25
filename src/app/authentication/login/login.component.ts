import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loadingSpinner:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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

 

   

   /* The code snippet you provided is the implementation of the `loginUser` function in your Angular
   component. Here's a breakdown of what it does: */
    // Call login service method passing userData
  


    

    
  }
}
