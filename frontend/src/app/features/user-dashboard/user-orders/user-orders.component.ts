import { Component, OnInit } from '@angular/core';
import Order from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import CartItem from '../../../shared/models/CartItem';
import { CartItemService } from '../../../core/services/cart-item.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  orders:Order[]=[];
  orderItems:CartItem[]=[];

  constructor(private orderservice: OrderService, private cartItemService:CartItemService){

  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderservice.getOrdersByUserId().subscribe(
      (data) => {
        this.orders = data as Order[];
        console.log(this.orders);
        
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  getOrderedItems(id:string){
    this.orderItems = [];
    this.cartItemService.getCartItemsByOrderId(id).subscribe(
      data => {
        console.log(data)
        this.orderItems = data;
      }
    )
  }
}
