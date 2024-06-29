import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  slides: Slide[] = [
    {
      title: 'Welcome to Shopie',
      description: 'Discover the best products at unbeatable prices.',
      image: 'test.jpg'
    },
    {
      title: 'Exclusive Offers',
      description: 'Check out our exclusive deals and promotions.',
      image: 'test2.jpg'
    },
    {
      title: 'New Arrivals',
      description: 'Stay ahead with the latest trends and products.',
      image: 'test3.jpg'
    }
  ];

  currentSlide: number = 0;
  autoPlayInterval: any;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoPlayInterval);
  }

  startAutoplay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }
}
