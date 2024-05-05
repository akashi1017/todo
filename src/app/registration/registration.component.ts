import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  providers : [AuthService]
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.username, this.password)
      .subscribe(response => {
        console.log(response);
      });
  }
}

