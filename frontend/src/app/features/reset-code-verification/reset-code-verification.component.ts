import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-code-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-code-verification.component.html',
  styleUrl: './reset-code-verification.component.css'
})
export class ResetCodeVerificationComponent {
  resetCode: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    // Add your reset code validation logic here
    if (this.resetCode.length === 6) {
      alert('Code accepted!');
      this.router.navigate(['/password-reset']); // Navigate to the reset password page
    } else {
      this.errorMessage = 'Invalid code';
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
