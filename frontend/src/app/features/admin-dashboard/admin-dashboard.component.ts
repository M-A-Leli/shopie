import { Component } from '@angular/core';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminTopBarComponent } from './admin-top-bar/admin-top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [AdminSidebarComponent,AdminTopBarComponent,RouterOutlet],

=======
  imports: [ RouterOutlet, AdminSidebarComponent, AdminTopBarComponent],
>>>>>>> f1abc04 (Authentication, Registration & Password Reset)
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
