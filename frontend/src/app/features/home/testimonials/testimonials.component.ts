import { Component } from '@angular/core';

interface Testimonial {
  text: string;
  author: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      text: 'This is the best online store I have ever used. The products are amazing and the service is top-notch!',
      author: 'John Doe'
    },
    {
      text: 'Fantastic shopping experience. The user interface is very intuitive and the customer support is excellent.',
      author: 'Jane Smith'
    },
    {
      text: 'I love the variety of products available. The prices are unbeatable and the quality is great.',
      author: 'Mike Johnson'
    }
  ];

  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    // this.updateCurrentTestimonial();
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentIndex];
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  // private updateCurrentTestimonial(): void {
  //   this.currentTestimonial = this.testimonials[this.currentIndex];
  // }
}
