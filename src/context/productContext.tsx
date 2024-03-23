import React, { createContext, useReducer } from 'react';
import { ProductData } from '../types/type';

interface productsContextType {
  state: ProductData;
  dispatch: React.Dispatch<any>;
}

const initialState: ProductData = {
  products: [],
  total: 0,
  skip: 0,
  limit: 5,
  size: 5,
};

export const productsContext = createContext<productsContextType>({
  state: initialState,
  dispatch: () => null,
});

export const productsReducer = (state: ProductData, action: { type: string; payload: any }): ProductData => {
  switch (action.type) {
    case 'SET_products':
      return {
        ...state,
        products: action.payload.products,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload,
      };

    case 'SET_LIMIT':
      return {
        ...state,
        limit: action.payload,
      };
    case 'SET_SIZE':
      return {
        ...state,
        size: action.payload,
      };
    case 'SET_SKIP':
      return {
        ...state,
        skip: action.payload,
      };

    default:
      return state;
  }
};

interface productsContextProviderProps {
  children: React.ReactNode;
}

export const productsContextProvider: React.FC<productsContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return <productsContext.Provider value={{ state, dispatch }}>{children}</productsContext.Provider>;
};
