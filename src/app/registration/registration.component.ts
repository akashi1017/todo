import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers : [AuthService]
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  registrationStatus: any;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password)
      .subscribe(
        response => {
          if (response.message === 'User registered successfully') {
            this.registrationStatus = 'Registration successful!';
            // Show alert
            window.alert('Registration successful! Please login.');
            // Redirect to login after successful registration
            this.router.navigate(['/login']);
          } else {
            this.registrationStatus = 'User already exists or registration failed!';
          }
        },
        error => {
          this.registrationStatus = 'Error: Could not connect to server';
          console.error('Registration Error:', error);
        }
      );
  }
}
