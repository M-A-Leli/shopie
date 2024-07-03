import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isHidden: boolean = false;
  lastScrollTop: number = 0;

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > this.lastScrollTop) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  navigateLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateCart(): void {
    this.router.navigate(['/cart']);
  }
}
