import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers : [AuthService]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginStatus: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          this.loginStatus = 'Login successful!';
          // Show alert
          window.alert('Login successful! Redirecting to task list.');
          // Redirect to task list after successful login
          this.router.navigate(['/tasks']);
        },
        error => {
          this.loginStatus = 'Login failed!';
          console.error('Login Error:', error);
        }
      );
  }
}
