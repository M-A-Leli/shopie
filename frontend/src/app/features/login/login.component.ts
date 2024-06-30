import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(): void {
    // Add your login logic here
    if (this.email === 'test@test.com' && this.password === 'password') {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or password';
      setTimeout(() => this.errorMessage = null, 3000); // Clear error after 3 seconds
    }
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
