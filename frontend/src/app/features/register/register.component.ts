import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      setTimeout(() => this.errorMessage = null, 3000); // Clear error after 3 seconds
    } else {
      // Add your registration logic here
      alert('Registration successful!');
      this.router.navigate(['/login']);
    }
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
