import React, { useEffect, useState } from 'react';
import { Product } from '../types/type';
import customAxios from '../lib/axios';
import Table from '../components/Table';
import { useProductContext } from '../hooks/useProducts';
import PageSize from '../components/PageSize';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import FilterOption from '../components/Filters';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

export default function Products() {
  const { state: productData, dispatch: productDispatch } = useProductContext();
  const [searchValue, setSearchValue] = useState('');
  const filters = ['All', 'laptops'];
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedOption, setSelectedOption] = useState('');
  const totalPages = Math.ceil(100 / (productData.size ?? 5));

  const handlePageChange = (page: number) => {
    productDispatch({ type: 'SET_SKIP', payload: page });
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value === selectedOption ? '' : value);
  };
  const handleSearchChange = (newValue: string) => {
    setSearchValue(newValue);
  };
  const onPageSizeChange = (newSize: string) => {
    productDispatch({ type: 'SET_SIZE', payload: newSize });
    productDispatch({ type: 'SET_SKIP', payload: 0 });
  };

  const filteredProducts =
    productData.products?.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.price.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        product.stock.toString().toLowerCase().includes(searchValue.toLowerCase());

      if (selectedOption === 'laptops') {
        return matchesSearch && product.category.toLowerCase() === 'laptops';
      } else if (selectedOption === 'all') {
        return matchesSearch;
      } else {
        return matchesSearch;
      }
    }) ?? [];

  const handleSort = (property: keyof Product) => {
    const sortOrderMultiplier = sortOrder === 'asc' ? 1 : -1;
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const valueA = String(a[property]).toLowerCase();
      const valueB = String(b[property]).toLowerCase();
      return sortOrderMultiplier * valueA.localeCompare(valueB);
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    productDispatch({
      type: 'SET_PRODUCTS',
      payload: {
        products: sortedProducts,
        limit: productData.limit,
        size: productData.size,
        total: productData.total,
      },
    });
  };

  const renderProductRow = (product: Product) => {
    return (
      <>
        <td>{product.title}</td>
        <td>{product.brand}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>{product.rating}</td>
        <td>{product.stock}</td>
      </>
    );
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiUrl = `/products?limit=${productData.size}&skip=${(productData.skip - 1) * (productData.size ?? 5)}`;
        const response = await customAxios.get(apiUrl);
        productDispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedOption, searchValue, productData.skip, productData.size, productDispatch]);
  return (
    <div>
      <div className='flex gap-4 my-10'>
        <PageSize data={productData.size ?? 5} onPageSizeChange={onPageSizeChange} />
        <Search value={searchValue} onChange={handleSearchChange} />
        <button
          onClick={() => {
            handleSort('title');
          }}
          className='flex pt-3'
        >
          Title
          <span className='pt-1'>
            {sortOrder === 'asc' ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </span>
        </button>
        <button
          onClick={() => {
            handleSort('brand');
          }}
          className='flex pt-3'
        >
          Brand
          <span className='pt-1'>
            {sortOrder === 'asc' ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </span>
        </button>
        <button
          onClick={() => {
            handleSort('category');
          }}
          className='flex pt-3'
        >
          Category
          <span className='pt-1'>
            {sortOrder === 'asc' ? <MdArrowDropUp /> : <MdArrowDropDown />}
          </span>
        </button>
        <FilterOption
          filters={filters}
          selectedOption={selectedOption}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
      <Table
        headers={['Title', 'Brand', 'Category', 'Price', 'Rating', 'Stock']}
        data={!filteredProducts ? productData.products : filteredProducts}
        renderRow={renderProductRow}
      />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
