import CartItem from "./CartItem";
import Category from "./Category";
import ProductImage from "./ProductImage";
import Review from "./Review";

export default interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  stock_quantity: number,
  category_id: string,
  category?: Category, //!
  images?: ProductImage[], //!
  reviews?: Review[], //!
  cart_items?: CartItem[] //!
}
