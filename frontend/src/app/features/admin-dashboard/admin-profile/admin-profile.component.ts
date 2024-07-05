import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import User from '../../../shared/models/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  details: any = {};
  showUpdateModal: boolean = false;
  updateMsg: boolean = false;
  updateSuccessMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.details = res;
      },
      (err) => {
        console.error('Error fetching user profile:', err);
      }
    );
  }

  openUpdateModal(): void {
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  updateUser(): void {
    this.userService.updateUserProfile(this.details).subscribe(
      (res) => {
        this.updateMsg = true;
        this.updateSuccessMessage = 'Profile updated successfully!';
        this.closeUpdateModal();
      },
      (err) => {
        console.error('Error updating user profile:', err);
      }
    );
  }
}
