import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { UserTopBarComponent } from './user-top-bar/user-top-bar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterOutlet, UserSidebarComponent, UserTopBarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
