import { Component, OnInit } from '@angular/core';
import Order from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent implements OnInit{
  orders: Order[] = [];
  paginatedOrders: Order[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.totalPages = Math.ceil(this.orders.length / this.pageSize);
      this.paginateOrders();
    });
  }

  paginateOrders(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedOrders = this.orders.slice(startIndex, startIndex + this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateOrders();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateOrders();
    }
  }
}
