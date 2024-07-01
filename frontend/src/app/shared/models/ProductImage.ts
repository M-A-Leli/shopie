import Product from "./Product";

export default interface ProductImage {
  id?: string,
  url: string,
  product_id: string,
  product?: Product //!
}
