import { Component, OnInit } from '@angular/core';
import Order from '../../../shared/models/Order';
import { OrderService } from '../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { CartItemService } from '../../../core/services/cart-item.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserCartComponent ],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  showCartItemsModal: boolean = false;
  showConfirmDeleteModal: boolean = false;
  selectedOrderId: string | null = null;
  selectedCartItems: any[] = [];

  constructor(private orderService: OrderService, private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUserId().subscribe(
      (data: Order[]) => this.orders = data,
      (error) => console.error(error)
    );
  }

  viewMore(orderId: string): void {
    this.cartItemService.getCartItemsByOrderId(orderId).subscribe(
      (cart_items) => {
        this.selectedCartItems = cart_items;
        this.selectedOrderId = orderId;
        this.showCartItemsModal = true;
      },
      (error) => console.error(error)
    );
  }

  closeCartItemsModal(): void {
    this.showCartItemsModal = false;
    this.selectedOrderId = null;
  }

  confirmDelete(orderId: string): void {
    this.selectedOrderId = orderId;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.selectedOrderId = null;
  }

  deleteOrder(): void {
    if (this.selectedOrderId) {
      this.orderService.deleteOrder(this.selectedOrderId).subscribe(
        () => {
          this.orders = this.orders.filter(order => order.id !== this.selectedOrderId);
          this.closeConfirmDeleteModal();
        },
        (error) => console.error(error)
      );
    }
  }
}
