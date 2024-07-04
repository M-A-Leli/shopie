import { Component } from '@angular/core';
import { CartItemService } from '../../../core/services/cart-item.service';
import CartItem from '../../../shared/models/CartItem';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {
  carts!: CartItem[]
  constructor(private cartService:CartItemService){
    
  }
  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems():void{
    this.cartService.getPendingCartItemsByUserId().subscribe(
      (data) => {
        this.carts = data;
        console.log(this.carts)
      },
      (error) => {
        console.error('Error fetching cart products', error);
      }
    )
  }
}
