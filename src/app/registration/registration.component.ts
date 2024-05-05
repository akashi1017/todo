import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers : [AuthService]
})
export class RegistrationComponent {
  name: string = '';
  username: string = '';
  email: string = '';
  dob: Date | null = null;
  password: string = '';
  registrationStatus: string | null = null;
  isError: boolean = false; // Flag to indicate if error occurred

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    let dobString = '';
    if (this.dob instanceof Date) {
      dobString = this.dob.toISOString().split('T')[0]; // Convert dob to string format
    }

    this.authService.register(this.name, this.username, this.email, dobString, this.password)
      .subscribe(
        response => {
          if (response.message === 'User registered successfully') {
            this.registrationStatus = 'Registration successful!';
            this.isError = false; // Reset error flag
            // Show alert
            window.alert('Registration successful! Please login.');
            // Redirect to login after successful registration
            this.router.navigate(['/login']);
          } else {
            this.registrationStatus = 'User already exists or registration failed!';
            this.isError = true; // Set error flag
          }
        },
        error => {
          this.registrationStatus = 'Error: Could not connect to server';
          this.isError = true; // Set error flag
          console.error('Registration Error:', error);
        }
      );
  }
}


