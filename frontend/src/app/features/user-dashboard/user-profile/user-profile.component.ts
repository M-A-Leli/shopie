import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import User from '../../../shared/models/User';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user!: User;

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
