import { useEffect, useState } from 'react';
import { Product, ProductData } from '../types/type';
import customAxios from '../lib/axios';
import Table from '../components/Table';
import { useProductContext } from '../hooks/useProducts';
import PageSize from '../components/PageSize';
import Pagination from '../components/Pagination';

export default function Products() {
  const { state: productData, dispatch: productDispatch } = useProductContext();
  const onPageSizeChange = (newSize: string) => {
    productDispatch({ type: 'SET_SIZE', payload: newSize });
    productDispatch({ type: 'SET_SKIP', payload: 0 });
  };
  const totalPages = Math.ceil(100 / (productData.size ?? 5));
  const handlePageChange = (page: number) => {
    productDispatch({ type: 'SET_SKIP', payload: page });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await customAxios.get(
          `/products?limit=${productData.size}&skip=${(productData.skip - 1) * (productData.size ?? 5)}`,
        );
        productDispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [productData.skip, productData.size, productDispatch]);

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
      <div className='flex gap-4 my-10'>
        <PageSize data={productData.size ?? 5} onPageSizeChange={onPageSizeChange} />
      </div>
      <Table
        headers={['Title', 'Category', 'Price', 'Rating', 'Stock']}
        data={productData.products}
        renderRow={renderProductRow}
      />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
