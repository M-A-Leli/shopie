import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  standalone: true,
  imports: [RouterLink,UserLogoutComponent,RouterOutlet],
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.css'
})
export class UserLogoutComponent {
  constructor(private route : Router){}
  loginMethod():void{
    this.route.navigate(['/login']);
  }
  toProduct():void{
    this.route.navigate(['user/dashboard/product']);
  }

}
