import { productsContext } from '../context/productContext';
import { useContext } from 'react';

export const useProductContext = () => {
  const context = useContext(productsContext);

  if (!context) {
    throw Error('useProducts must be used inside  Products Context');
  }

  return context;
};
