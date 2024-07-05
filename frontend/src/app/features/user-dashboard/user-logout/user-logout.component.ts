import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  imports: [RouterLink,UserLogoutComponent,RouterOutlet],
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.css'
})
export class UserLogoutComponent {

constructor(private authService: AuthService, private router: Router) { }

  loginMethod() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  toProfile() {
    this.router.navigate(['/user/dashboard/profile']);
  }
}
