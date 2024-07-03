import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-top-bar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-top-bar.component.html',
  styleUrl: './user-top-bar.component.css'
})
export class UserTopBarComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  searchProducts(): void {
    // this.router.navigate(['product'], { queryParams: { search: this.searchTerm } });
  }
}
