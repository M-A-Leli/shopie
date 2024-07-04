import Admin from "./Admin";
import Cart from "./Order";
import Review from "./Review";

export default interface User {
  id?: string,
  username: string,
  email: string,
  password?: string,
  phone_number?: string,
  admin?: Admin, //!
  carts?: Cart[], //!
  reviews?: Review[] //!
}
