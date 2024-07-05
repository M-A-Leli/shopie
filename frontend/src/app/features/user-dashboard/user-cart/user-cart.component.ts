import { Component, Input } from '@angular/core';
import { CartItemService } from '../../../core/services/cart-item.service';
import CartItem from '../../../shared/models/CartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {

  @Input() cartItems: any[] = [];

  constructor(private cartService:CartItemService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  closeCart(): void {
    // Logic to close the cart modal
  }

  getCartItems():void{
    this.cartService.getPendingCartItemsByUserId().subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error fetching cart products', error);
      }
    )
  }
}
