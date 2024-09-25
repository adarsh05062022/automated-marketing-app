import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import statesList from '../../../assets/statesList.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  states = statesList.states; // Assuming statesList is structured with a 'states' array
  registrationForm!: FormGroup;
  cities: string[] = [];
  userData: {
    username: string;
    email: string;
    password: string;
    isOwner: boolean;
    state: string; // Added state
    city: string;  // Added city
  } = {
    username: '',
    email: '',
    password: '',
    isOwner: false, // Default role
    state: '',      // Initialize state
    city: '',       // Initialize city
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['agent', Validators.required], // Default role is 'agent'
      state: ['', Validators.required], // State selection
      city: ['', Validators.required], // City selection
    });

    // Watch for changes in the selected state
    this.registrationForm.get('state')?.valueChanges.subscribe(selectedState => {
      const stateObj = this.states.find(s => s.state === selectedState);
      this.cities = stateObj ? stateObj.cities : []; // Update cities based on selected state
      this.registrationForm.get('city')?.setValue(''); // Reset city selection
    });
  }

  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    // Assign form values to userData object
    this.userData = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      isOwner: this.registrationForm.value.role === 'owner', // Set owner status
      state: this.registrationForm.value.state, // Add state
      city: this.registrationForm.value.city,   // Add city
    };


    console.log(this.userData)

    // Uncomment and implement your auth service registration logic here
    // this.authService.register(this.userData).subscribe(
    //   (response) => {
    //     this.toastr.success("User registered successfully", "", { timeOut: 2000 });
    //     this.router.navigate(['/auth/login']);
    //   },
    //   (error) => {
    //     this.toastr.error("Error registering user", "", { timeOut: 2000 });
    //   }
    // );
  }
}
