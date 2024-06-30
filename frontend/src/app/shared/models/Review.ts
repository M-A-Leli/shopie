import Product from "./Product";
import User from "./User";

export default interface Review {
  id?: string,
  rating: number,
  comment: string,
  user_id: string,
  user?: User, //!
  product_id: string,
  product?: Product, //!
}
