interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  bloodGroup: string;
  eyeColor: string;
}
type UserData = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
  size?: number;
};

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}
type ProductData = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type { User, UserData, Product, ProductData };
