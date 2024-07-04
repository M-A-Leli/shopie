import Product from "./Product";

export default interface Category {
  id: string,
  name: string,
  image_url: string, //!
  product?: Product[] //!
}
