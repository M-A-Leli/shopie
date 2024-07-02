import CartItem from "./CartItem";
import User from "./User";

export default interface Order {
  id?: string,
  user_id: string,
  user?: User, //!
  cart_items: CartItem[], //!
  status?: string,
  total_price: number
}
