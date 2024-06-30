import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    // Add your forgot password logic here
    if (this.email === 'test@test.com') {
      alert('Password reset link sent to your email!');
      this.router.navigate(['/reset-code/verify']);
    } else {
      this.errorMessage = 'Email not found';
      setTimeout(() => this.errorMessage = null, 3000); // Clear error after 3 seconds
    }
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
