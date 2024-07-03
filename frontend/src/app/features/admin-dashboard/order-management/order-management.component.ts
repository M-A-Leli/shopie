import { Component } from '@angular/core';
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
export class OrderManagementComponent {
  orders:Order[] = [];
  paginatedOrders: Order[] = [];
  currentPage = 1;
  itemsPerPage = 10;


constructor(private orderService:OrderService){}




  fetchOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      this.orders = res
      this.paginate();
    });
  }


  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }
}
