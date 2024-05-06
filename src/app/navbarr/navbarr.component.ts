import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbarr',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navbarr.component.html',
  styleUrl: './navbarr.component.css'
})
export class NavbarrComponent {

}
