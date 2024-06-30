import CartItem from "./CartItem";
import User from "./User";

export default interface Cart {
  id?: string,
  user_id: string,
  user?: User //!
  cart_items: CartItem[] //!
}
