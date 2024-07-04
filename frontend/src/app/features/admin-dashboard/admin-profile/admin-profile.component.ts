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
  showUpdateModal = false;
  updateMsg = false;
  updateSuccessMessage = '';

  details: User = {
    username: '',
    email: '',
    phone_number: ''
  };

  constructor(private profileService: UserService) {}

  ngOnInit(): void {
    this.getAdminProfileDetails();
  }

  getAdminProfileDetails(): void {
    this.profileService.getUserProfile().subscribe((res) => {
      this.details = res || {
        username: '',
        email: '',
        phone_number: ''
      };
    });
  }

  openUpdateModal(): void {
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  updateUser(): void {
    if (this.details) {
      this.profileService.updateUserProfile(this.details).subscribe(() => {
        this.getAdminProfileDetails();
        this.updateMsg = true;
        this.updateSuccessMessage = 'User updated successfully.';
        setTimeout(() => {
          this.updateMsg = false;
          this.updateSuccessMessage = '';
        }, 2000);
        this.closeUpdateModal();
      });
    }
  }
}
