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

interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
}

export type { User, Product };
