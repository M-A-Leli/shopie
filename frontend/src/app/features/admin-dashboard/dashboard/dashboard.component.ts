import { Component } from '@angular/core';
import { PlatformDetectorService } from '../../../services/platform-detector.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { AdminTopBarComponent } from '../admin-top-bar/admin-top-bar.component';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { UserService } from '../../../core/services/user.service';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, AdminTopBarComponent, RouterOutlet, AdminSidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isBrowser: boolean;
  productCount:number=0;
  orderCount:number = 0;
  userCount:number = 0;

  constructor(private platformDetectorService: PlatformDetectorService,private productService:ProductService,private orderService:OrderService,private userService:UserService) {
    this.isBrowser = this.platformDetectorService.isBrowser();
  }

  ngOnInit(): void {
    this.allProductsCount();
    this.allUsersCount();
    this.allOrdersCount();
  }


  allProductsCount(){
    this.productService.getAllProducts().subscribe((res)=>{
      this.productCount=res.length
    })
  }

  allOrdersCount(){
    this.orderService.getAllOrders().subscribe((res=>{
      this.orderCount = res.length
    }))
  }
  allUsersCount(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.userCount=res.length
    })
  }





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
