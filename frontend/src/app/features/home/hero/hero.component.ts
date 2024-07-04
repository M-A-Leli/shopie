import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  slides = [
    { image: '/hero1.jpeg' },
    // { image: '/hero1.webp' },
    { image: '/hero2.jpg' },
    { image: '/hero3.jpg' }
  ];
  currentSlide = 0;

  staticContent = {
    title: 'Welcome to Shopie',
    tag: "Your One-Stop Online Shop",
    description: 'Discover a wide range of products at unbeatable prices. Shopie offers a seamless shopping experience with the latest deals and exclusive offers just for you.'
  };

  constructor() { }

  ngOnInit(): void {
    // this.startCarousel(); //!
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }
}
