import { Component } from '@angular/core';
import { PlatformDetectorService } from '../../../services/platform-detector.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { AdminTopBarComponent } from '../admin-top-bar/admin-top-bar.component';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective,CommonModule,AdminTopBarComponent,RouterOutlet,AdminSidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isBrowser: boolean;

  constructor(private platformDetectorService: PlatformDetectorService) {
    this.isBrowser = this.platformDetectorService.isBrowser();
  }

  ngOnInit(): void {}

  public chartOptions = {
    responsive: true,
  };

  // Products Data
  public productData = [
    { data: [120, 150, 180, 90], label: 'Products' }
  ];
  public productLabels = ['Electronics', 'Clothing', 'Home Appliances', 'Books'];

  // Sales Data
  public salesData = [
    { data: [300, 500, 400, 700], label: 'Sales' }
  ];
  public salesLabels = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Customers Data
  public customersData = [
    { data: [200, 400, 600, 800], label: 'Customers' }
  ];
  public customersLabels = ['January', 'February', 'March', 'April'];

  // Orders Data
  public ordersData = [
    { data: [100, 200, 300, 400], label: 'Orders' }
  ];
  public ordersLabels = ['Pending', 'Shipped', 'Delivered', 'Returned'];
}
