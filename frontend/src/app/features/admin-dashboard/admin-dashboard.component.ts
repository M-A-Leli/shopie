import { Component } from '@angular/core';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminTopBarComponent } from './admin-top-bar/admin-top-bar.component';
import { RouterOutlet } from '@angular/router';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ RouterOutlet, AdminSidebarComponent, AdminTopBarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
