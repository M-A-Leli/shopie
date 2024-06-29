import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter-signup.component.html',
  styleUrl: './newsletter-signup.component.css'
})
export class NewsletterSignupComponent {
  email: string = '';
  submitted: boolean = false;

  onSubmit(): void {
    if (this.email) {
      // Here you would typically send the email to your backend service
      console.log('Email submitted:', this.email);
      this.submitted = true;
      this.email = '';
    }
  }
}
