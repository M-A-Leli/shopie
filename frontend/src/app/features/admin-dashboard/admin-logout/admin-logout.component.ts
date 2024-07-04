import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent {

  constructor(private cookieService: CookieService,private router:Router){}

  logout(){
    this.cookieService.delete('token')
    this.router.navigate(['/login'])
  }

  cancel(){
    this.router.navigate(['/admin/dashboard']);
  }
}
