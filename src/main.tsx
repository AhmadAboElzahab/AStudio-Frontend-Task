import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UsersContextProvider } from './context/userContext.tsx';
import { ProductsContextProvider } from './context/productContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsersContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </UsersContextProvider>
  </React.StrictMode>,
);
