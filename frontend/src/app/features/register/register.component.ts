import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import User from '../../shared/models/User';

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
  phoneNumber: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.clearErrors();

    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all required fields.';
      this.clearErrors();
      return;
    }

    if (!this.validateUsername(this.username)) {
      this.errorMessage = 'Invalid username. It must start with a letter and can contain letters, numbers, hyphens, or underscores.';
      this.clearErrors();
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email address.';
      this.clearErrors();
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8 and 16 characters.';
      this.clearErrors();
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.clearErrors();
      return;
    }

    if (!this.validatePhoneNumber(this.phoneNumber)) {
      this.errorMessage = 'Invalid phone number. It must be exactly 10 digits long and contain only numbers.';
      this.clearErrors();
      return;
    }

    const newUser: User = {
      username: this.username,
      email: this.email,
      password: this.password,
      phone_number: this.phoneNumber
    }

    this.userService.createUser(newUser).subscribe({
      next: data => {
        this.successMessage = 'Registration successfull!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: err => {
        if (err.status === 409 || err.status === 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    });
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  validateUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_]*$/;
    return usernameRegex.test(username);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
    return passwordRegex.test(password);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
