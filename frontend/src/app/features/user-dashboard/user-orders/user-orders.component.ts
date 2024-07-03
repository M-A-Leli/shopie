import { Component, OnInit } from '@angular/core';
import Order from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  orders:Order[]=[];

  constructor(private orderservice: OrderService){

  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderservice.getOrdersByUserId().subscribe(
      (data) => {
        this.orders = data;
        console.log(this.orders);
        
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }
}
