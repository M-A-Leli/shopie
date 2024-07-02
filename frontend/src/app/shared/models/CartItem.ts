import Order from "./Order";
import Product from "./Product";

export default interface CartItem {
  id?: string,
  quantity: number,
  product_id: string,
  product: Product, //!
  order_id: string,
  order?: Order, //!
  subtotal: number
}
