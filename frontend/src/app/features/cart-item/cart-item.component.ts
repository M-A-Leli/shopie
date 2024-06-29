import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  cartItems: CartItem[] = [
    // Populate with your cart data
  ];

  constructor() { }

  ngOnInit(): void {
    // Load cart items from a service or local storage
  }

  updateQuantity(item: CartItem): void {
    // Update the quantity of the item
    if (item.quantity <= 0) {
      this.removeFromCart(item);
    }
  }

  removeFromCart(item: CartItem): void {
    // Remove the item from the cart
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== item.product.id);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  checkout(): void {
    // Handle the checkout process
    alert('Proceeding to checkout...');
  }
}
