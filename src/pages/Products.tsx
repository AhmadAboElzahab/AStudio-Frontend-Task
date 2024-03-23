import { useEffect, useState } from 'react';
import { Product, ProductData } from '../types/type';
import customAxios from '../lib/axios';
import Table from '../components/Table';

export default function Products() {
  const [products, setProducts] = useState<ProductData>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderProductRow = (product: Product) => {
    return (
      <>
        <td>{product.title}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>{product.rating}</td>
        <td>{product.stock}</td>
      </>
    );
  };

  return (
    <div>
      <Table
        headers={['Title', 'Category', 'Price', 'Rating', 'Stock']}
        data={products.products}
        renderRow={renderProductRow}
      />
    </div>
  );
}
