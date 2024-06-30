import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NewsletterSignupComponent } from './newsletter-signup/newsletter-signup.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, FeaturedProductsComponent, CategoriesComponent, SpecialOffersComponent, NewArrivalsComponent, TestimonialsComponent, NewsletterSignupComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
