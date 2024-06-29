import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      setTimeout(() => this.errorMessage = null, 3000); // Clear error after 3 seconds
    } else {
      // Add your password reset logic here
      alert('Password reset successful!');
      this.router.navigate(['/login']);
    }
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
