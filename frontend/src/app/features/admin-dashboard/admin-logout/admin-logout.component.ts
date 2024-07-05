import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent {

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router, private location: Location) {}

  logout(): void {
    // this.cookieService.delete('token')
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    }, (error) => {
      console.error('Logout failed', error);
    });
  }

  cancel(): void {
    this.location.back();
  }
}
