import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import CartItem from '../../shared/models/CartItem';
import { CartItemService } from '../../core/services/cart-item.service';
import { Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  cartItems: CartItem[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private cartItemService: CartItemService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  loadCartItems() {
    this.cartItemService.getPendingCartItemsByUserId().subscribe(
      (data) => {
        this.cartItems = data;
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 404 || 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    );
  }

  updateQuantity(item_id: string, item: CartItem) {
    if (item.quantity) {
      item.quantity = item.quantity < 1 ? 1 : item.quantity;
    }

    this.cartItemService.updateCartItem(item_id, item).subscribe(
      (data) => {
        this.successMessage = 'Cart updated successfully';
        setTimeout(() => this.successMessage = null, 3000);
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 404 || 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    );
  }

  removeFromCart(item_id: string) {
    this.cartItemService.deleteCartItem(item_id).subscribe(
      (data) => {
        this.cartItems = this.cartItems.filter(ci => ci.id !== item_id);
        this.successMessage = 'Item removed from cart';
        setTimeout(() => this.successMessage = null, 3000);
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 404 || 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => {
      if (item.product && item.quantity) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  }

  checkout() {
    this.orderService.checkoutOrderByUserId().subscribe(
      (data) => {
        this.successMessage = 'Order created successfully';
        setTimeout(() => {
          this.successMessage = null;
          this.loadCartItems();
        }, 3000);
      },
      (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 404 || 400) {
          this.errorMessage = err.error.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    );
  }
}
