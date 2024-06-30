import Cart from "./Cart";
import Product from "./Product";

export default interface CartItem {
  id?: string,
  quantity: number,
  product_id: string,
  product: Product, //!
  cart_id: string,
  cart?: Cart, //!
}
