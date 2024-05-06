import { Component } from '@angular/core';
import { NavbarrComponent } from '../navbarr/navbarr.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarrComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
