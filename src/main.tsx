import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UsersContextProvider } from './context/usersContex.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsersContextProvider>
      <App />
    </UsersContextProvider>
  </React.StrictMode>,
);
